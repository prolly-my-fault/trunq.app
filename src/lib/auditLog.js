import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const LOG_DIR = path.join(process.cwd(), 'logs')
const LOG_FILE = path.join(LOG_DIR, 'audit.log')

/**
 * Log an admin action
 * @param {Object} params
 * @param {string} params.action - Action performed (e.g., 'VIEW_DASHBOARD', 'UPDATE_USER')
 * @param {string} params.userId - User ID performing the action
 * @param {string} params.userEmail - User email
 * @param {Object} params.metadata - Additional metadata
 * @param {string} params.ipAddress - IP address of the request
 * @param {string} params.userAgent - User agent string
 */
export async function logAdminAction({
  action,
  userId,
  userEmail,
  metadata = {},
  ipAddress = 'unknown',
  userAgent = 'unknown',
}) {
  try {
    // Ensure logs directory exists
    if (!existsSync(LOG_DIR)) {
      await mkdir(LOG_DIR, { recursive: true })
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      user: {
        id: userId,
        email: userEmail,
      },
      metadata,
      request: {
        ipAddress,
        userAgent,
      },
    }

    const logLine = JSON.stringify(logEntry) + '\n'

    // Append to log file
    await writeFile(LOG_FILE, logLine, { flag: 'a' })

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[AUDIT]', logEntry)
    }
  } catch (error) {
    console.error('Failed to write audit log:', error)
  }
}

/**
 * Read recent audit logs
 * @param {number} limit - Number of recent logs to retrieve
 * @returns {Array} Array of log entries
 */
export async function getRecentLogs(limit = 100) {
  try {
    if (!existsSync(LOG_FILE)) {
      return []
    }

    const content = await readFile(LOG_FILE, 'utf-8')
    const lines = content.trim().split('\n').filter(Boolean)

    // Get last N lines
    const recentLines = lines.slice(-limit)

    return recentLines.map(line => {
      try {
        return JSON.parse(line)
      } catch {
        return null
      }
    }).filter(Boolean).reverse() // Most recent first
  } catch (error) {
    console.error('Failed to read audit logs:', error)
    return []
  }
}

/**
 * Helper to extract request info from Next.js headers
 */
export function getRequestInfo(headers) {
  return {
    ipAddress: headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown',
    userAgent: headers.get('user-agent') || 'unknown',
  }
}

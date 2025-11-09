import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getRecentLogs, logAdminAction } from "@/lib/auditLog"
import { headers } from "next/headers"

export default async function AuditLogsPage() {
  const session = await auth()

  // Server-side check - redirect if not admin
  if (!session?.user?.isAdmin) {
    redirect("/")
  }

  // Log audit log access
  const headersList = await headers()
  await logAdminAction({
    action: 'VIEW_AUDIT_LOGS',
    userId: session.user.id,
    userEmail: session.user.email,
    metadata: {
      userName: session.user.name,
    },
    ipAddress: headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown',
    userAgent: headersList.get('user-agent') || 'unknown',
  })

  // Get recent logs
  const logs = await getRecentLogs(100)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
            Audit Logs
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Security and activity monitoring for admin actions
          </p>
        </div>

        <div className="mb-4">
          <a
            href="/admin"
            className="inline-block px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)'
            }}
          >
            ← Back to Dashboard
          </a>
        </div>

        {logs.length === 0 ? (
          <div
            className="p-8 text-center rounded-lg"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)'
            }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>No audit logs yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log, index) => (
              <div
                key={index}
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border)'
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-sm font-semibold px-2 py-1 rounded"
                        style={{
                          backgroundColor: getActionColor(log.action),
                          color: '#ffffff'
                        }}
                      >
                        {log.action}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-primary)' }}>
                      <strong>User:</strong> {log.user.email} (ID: {log.user.id})
                    </div>
                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                      <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        <strong>Metadata:</strong> {JSON.stringify(log.metadata)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs mt-2 pt-2 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                  <strong>IP:</strong> {log.request.ipAddress} | <strong>User Agent:</strong> {log.request.userAgent.substring(0, 80)}{log.request.userAgent.length > 80 ? '...' : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Showing last {logs.length} log entries. Logs are stored in <code>logs/audit.log</code>
          </p>
        </div>
      </div>
    </div>
  )
}

function getActionColor(action) {
  if (action.startsWith('VIEW')) return '#0D4D56' // Teal
  if (action.startsWith('CREATE')) return '#15797F' // Primary
  if (action.startsWith('UPDATE') || action.startsWith('EDIT')) return '#20C9C9' // Primary light
  if (action.startsWith('DELETE')) return '#dc2626' // Red
  return '#6b7280' // Gray
}

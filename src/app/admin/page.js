import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { logAdminAction } from "@/lib/auditLog"
import { headers } from "next/headers"

export default async function AdminPage() {
  const session = await auth()

  // Server-side check - redirect if not admin
  if (!session?.user?.isAdmin) {
    redirect("/")
  }

  // Log admin dashboard access
  const headersList = await headers()
  await logAdminAction({
    action: 'VIEW_ADMIN_DASHBOARD',
    userId: session.user.id,
    userEmail: session.user.email,
    metadata: {
      userName: session.user.name,
    },
    ipAddress: headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown',
    userAgent: headersList.get('user-agent') || 'unknown',
  })

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Welcome, {session.user?.name || session.user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin Cards */}
          <a
            href="/admin/audit-logs"
            className="p-6 rounded-lg transition-all"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)'
            }}
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary)' }}>
              🔒 Audit Logs
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              View security logs and admin activity
            </p>
          </a>

          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)'
            }}
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Users
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Manage user accounts and permissions
            </p>
          </div>

          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)'
            }}
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Settings
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Configure application settings
            </p>
          </div>

          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)'
            }}
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Analytics
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              View usage statistics and reports
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-elevated)' }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Session Info
          </h3>
          <pre className="text-xs overflow-auto p-4 rounded" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}>
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

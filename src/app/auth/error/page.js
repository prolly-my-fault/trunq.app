'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-md w-full mx-4">
        <div
          className="rounded-lg shadow-lg p-8 text-center"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            borderColor: 'var(--border)',
            border: '1px solid'
          }}
        >
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full" style={{ backgroundColor: '#fee2e2' }}>
              <svg className="w-8 h-8" style={{ color: '#dc2626' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Authentication Error
          </h1>

          <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
            {error === "AccessDenied" && "Access denied. Your email or domain is not authorized to access this application."}
            {error === "Configuration" && "There is a problem with the server configuration. Please contact support."}
            {error === "Verification" && "The verification link is invalid or has expired."}
            {!error && "An unexpected error occurred during authentication."}
          </p>

          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}

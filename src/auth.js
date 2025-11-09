import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

// Allowed GitHub usernames or IDs
const ALLOWED_GITHUB_USERNAMES = [
  // Add specific GitHub usernames here
  // "octocat",
  // "yourusername",
  "prolly-my-fault",
  "hsdp-smulford",
]

const ALLOWED_GITHUB_IDS = [
  // Add specific GitHub user IDs here (numeric)
  // 123456,
]

// Allowed Google emails and domains
const ALLOWED_GOOGLE_EMAILS = [
  // Add specific allowed emails here
  // "user@example.com",
]

const ALLOWED_GOOGLE_DOMAINS = [
  // Add allowed domains here
  // "example.com",
  // "company.com",
  "squarefoxtech.com",
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Restrict GitHub logins
      if (account.provider === "github") {
        // If no restrictions configured, allow all
        if (ALLOWED_GITHUB_USERNAMES.length === 0 && ALLOWED_GITHUB_IDS.length === 0) {
          return true
        }

        const username = profile?.login?.toLowerCase()
        const userId = parseInt(profile?.id)

        // Check if username is in allowed list
        if (username && ALLOWED_GITHUB_USERNAMES.map(u => u.toLowerCase()).includes(username)) {
          return true
        }

        // Check if user ID is in allowed list
        if (userId && ALLOWED_GITHUB_IDS.includes(userId)) {
          return true
        }

        // Deny access if not in allowed list
        return false
      }

      // Restrict Google logins
      if (account.provider === "google") {
        // If no restrictions configured, allow all
        if (ALLOWED_GOOGLE_EMAILS.length === 0 && ALLOWED_GOOGLE_DOMAINS.length === 0) {
          return true
        }

        const email = user.email?.toLowerCase()

        if (!email) {
          return false
        }

        // Check if email is in allowed list
        if (ALLOWED_GOOGLE_EMAILS.map(e => e.toLowerCase()).includes(email)) {
          return true
        }

        // Check if domain is in allowed list
        const domain = email.split("@")[1]
        if (ALLOWED_GOOGLE_DOMAINS.map(d => d.toLowerCase()).includes(domain)) {
          return true
        }

        // Deny access if not in allowed list
        return false
      }

      return true
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      // Add admin status to session
      if (token?.isAdmin !== undefined) {
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      // Set admin status on initial sign in
      if (account && profile) {
        let isAdmin = false

        if (account.provider === "github") {
          const username = profile?.login?.toLowerCase()
          const userId = parseInt(profile?.id)

          // Check if user is in allowed GitHub lists
          if (username && ALLOWED_GITHUB_USERNAMES.map(u => u.toLowerCase()).includes(username)) {
            isAdmin = true
          }
          if (userId && ALLOWED_GITHUB_IDS.includes(userId)) {
            isAdmin = true
          }
        }

        if (account.provider === "google") {
          const email = user.email?.toLowerCase()

          if (email) {
            // Check if email is in allowed list
            if (ALLOWED_GOOGLE_EMAILS.map(e => e.toLowerCase()).includes(email)) {
              isAdmin = true
            }
            // Check if domain is in allowed list
            const domain = email.split("@")[1]
            if (ALLOWED_GOOGLE_DOMAINS.map(d => d.toLowerCase()).includes(domain)) {
              isAdmin = true
            }
          }
        }

        token.isAdmin = isAdmin
      }

      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
})

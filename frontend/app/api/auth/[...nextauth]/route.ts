import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

// Create a dedicated axios instance for NextAuth
const authApiClient = axios.create({
  baseURL: process.env.NEXTAUTH_BACKEND_URL || 'http://backend:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const response = await authApiClient.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          })

          const user = response.data
          if (user && user.access_token) {
            return {
              id: user.user.id,
              email: user.user.email,
              name: user.user.email,
              accessToken: user.access_token,
            }
          }
          return null
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
  },
})

export { handler as GET, handler as POST }
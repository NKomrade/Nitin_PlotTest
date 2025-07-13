import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { apiClient } from './api'

// Extend the built-in session and user types
declare module 'next-auth' {
  interface User {
    accessToken?: string
  }
  
  interface Session {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}

export const authConfig: NextAuthOptions = {
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
          const response = await apiClient.post('/auth/login', {
            email: credentials.email,
            password: credentials.password
          })

          if (response.data?.access_token) {
            return {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
              accessToken: response.data.access_token
            }
          }
        } catch (error) {
          console.error('Auth error:', error)
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  session: {
    strategy: 'jwt'
  }
}
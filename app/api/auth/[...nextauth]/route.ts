import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server only
);

// EXPORT THIS - needed for getServerSession in other routes
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        /* 1️ Supabase verifies email + password */
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          return null; // invalid login
        }

        /* 2️ Check admin role */
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (!profile || profile.role !== 'ADMIN') {
          return null; // not an admin
        }

        /* 3️ Return user to NextAuth */
        return {
          id: data.user.id,
          email: data.user.email,
          role: profile.role,
        };
      },
    }),
  ],

  // Session configuration with expiry
  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60, // 4 hours (in seconds)
    updateAge: 60 * 60, // Update session every 1 hour if active
  },

  // JWT configuration
  jwt: {
    maxAge: 4 * 60 * 60, // Should match session maxAge
  },

  // Cookie configuration
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/admin/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
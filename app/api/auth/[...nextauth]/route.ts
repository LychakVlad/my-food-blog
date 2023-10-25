import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../../models/user';
import { connectToDB } from '../../../../utils/database';
import { JWT } from 'next-auth/jwt';

async function mapGoogleIdToObjectId(googleId: string | undefined) {
  console.log('Entered the serverless function');

  return { dummy: 'data' };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        const userId = await mapGoogleIdToObjectId(token.sub);
        session.user.id = userId.toString();
      }
      return session;
    },
    jwt: async ({ user, token }: { user: { id: string }; token: JWT }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async signIn({ profile }) {
      if (profile) {
        try {
          await connectToDB();

          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name?.replace(' ', '').toLowerCase(),
              image: profile.picture,
              id: profile.sub,
            });
          }

          return true;
        } catch (error) {
          const errorObject = error as Error;
          console.error('Error message:', errorObject.message);
          console.log('Profile object:', profile);
          return false;
        }
      }
      return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

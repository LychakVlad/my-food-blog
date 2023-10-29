import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../../models/user';
import { connectToDB } from '../../../../utils/database';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const userExists = await User.findOne({ email: session.user.email });
      session.user.id = userExists._id.toString();
      return session;
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

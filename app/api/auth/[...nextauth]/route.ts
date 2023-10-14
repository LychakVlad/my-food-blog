import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../../models/user';
import { connectToDB } from '../../../../utils/database';

const googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET;
const googleIdSecret: string = process.env.GOOGLE_ID;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleIdSecret,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isAdmin: token.isAdmin,
          vendorId: token.vendorId,
          stripe_id: token.stripeId,
        },
      };
    },
    async signIn(params) {
      const { profile } = params;
      if (profile) {
        try {
          await connectToDB();

          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name?.replace(' ', '').toLowerCase(),
              image: profile.image,
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
});

export { handler as GET, handler as POST };

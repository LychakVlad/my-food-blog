import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../../models/user';
import { connectToDB } from '../../../../utils/database';
import { JWT } from 'next-auth/jwt';

const googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET;
const googleIdSecret: string = process.env.GOOGLE_ID;

async function mapGoogleIdToObjectId(googleId) {
  try {
    const user = await User.findOne({ googleId: googleId });
    if (user) {
      return user._id;
    }
  } catch (error) {
    console.error('Error mapping Google ID to ObjectId:', error);
  }
  return null;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleIdSecret,
      clientSecret: googleClientSecret,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        const userId = await mapGoogleIdToObjectId(token.sub);
        session.user.id = userId;
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
              image: profile.image,
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
});

export { handler as GET, handler as POST };

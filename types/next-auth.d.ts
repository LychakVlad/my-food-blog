import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number | string;
  }
  interface Session {
    user: {
      id: number | string;
    } & DefaultSession['user'];
  }

  interface Profile {
    picture: string;
  }
}

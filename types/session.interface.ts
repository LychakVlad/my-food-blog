import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

declare module 'next-auth/jwt/types' {
  interface JWT {
    uid: string;
  }
}

interface User {
  id: string;
  email: string;
  username: string;
  image: string;
}

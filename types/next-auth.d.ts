import NextAuth, { DefaultSession } from 'next-auth';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

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

interface AuthData {
  email: string;
  password: string;
  name?: string;
}

interface AuthForm {
  onSubmit: SubmitHandler<FieldValues>;
  error: string;
  type: string;
}

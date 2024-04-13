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

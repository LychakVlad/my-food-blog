'use client';

import { Session } from 'next-auth/core/types';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
  session: Session | null | undefined;
}

const Provider: FC<ProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

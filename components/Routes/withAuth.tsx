'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function withAuth(Component) {
  return function WithAuth(props) {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (!session) {
        router.push('/');
      }
    }, []);

    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}

export default withAuth;

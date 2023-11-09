'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import whenLoggedIn from '../../components/Routes/whenLoggedIn';
import AuthForm from '../../components/Auth/AuthForm';
import { FieldValues } from 'react-hook-form';

const LogIn = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState('');

  const loginUser = async (data: FieldValues) => {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      setAuthError('Wrong credentials.');
    } else {
      setAuthError('');
      router.push('/');
    }
  };

  return <AuthForm onSubmit={loginUser} type={'signin'} error={authError} />;
};

export default whenLoggedIn(LogIn);

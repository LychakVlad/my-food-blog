'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import whenLoggedIn from '../../components/Routes/whenLoggedIn';
import AuthForm from '../../components/Auth/AuthForm';
import { FieldValues } from 'react-hook-form';

const LogIn = () => {
  const router = useRouter();

  const loginUser = async (data: FieldValues) => {
    signIn('credentials', {
      ...data,
      redirect: false,
    });
    router.push('/');
  };

  return <AuthForm onSubmit={loginUser} type={'signin'} />;
};

export default whenLoggedIn(LogIn);

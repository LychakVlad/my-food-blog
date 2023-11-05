'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import whenLoggedIn from '../../components/Routes/whenLoggedIn';
import AuthForm from '../../components/Auth/AuthForm';
import { FieldValues } from 'react-hook-form';

const SignUp = () => {
  const router = useRouter();

  const signUpNewUser = async (data: FieldValues) => {
    const response = await fetch('/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    const userInfo = await response.json();
    router.push('/login');
  };

  return <AuthForm onSubmit={signUpNewUser} type={'signup'} />;
};

export default whenLoggedIn(SignUp);

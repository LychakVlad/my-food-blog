'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import whenLoggedIn from '../../components/Routes/whenLoggedIn';
import AuthForm from '../../components/Auth/AuthForm';
import { FieldValues } from 'react-hook-form';

const SignUp = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState('');

  const signUpNewUser = async (data: FieldValues) => {
    try {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setAuthError(errorMessage);
      } else {
        const userInfo = await response.json();
        setAuthError('');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setAuthError('An error occurred. Please try again.');
    }
  };

  return (
    <AuthForm onSubmit={signUpNewUser} type={'signup'} error={authError} />
  );
};

export default whenLoggedIn(SignUp);

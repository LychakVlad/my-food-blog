'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import whenLoggedIn from '../../components/Routes/whenLoggedIn';
import AuthForm from '../../components/AuthForm/AuthForm';

const SignUp = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const signUpNewUser = async (e) => {
    e.preventDefault();
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

  return (
    <AuthForm
      data={data}
      setData={setData}
      handleSubmit={signUpNewUser}
      type={'signup'}
    />
  );
};

export default whenLoggedIn(SignUp);

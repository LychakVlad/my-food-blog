'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import whenLoggedIn from '../../components/Routes/whenLoggedIn';
import AuthForm from '../../components/AuthForm/AuthForm';

const LogIn = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    signIn('credentials', {
      ...data,
      redirect: false,
    });
    router.push('/');
  };

  return (
    <AuthForm
      data={data}
      setData={setData}
      handleSubmit={loginUser}
      type={'signin'}
    />
  );
};

export default whenLoggedIn(LogIn);

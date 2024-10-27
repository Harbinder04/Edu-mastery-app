
import Signin from '@/components/signin';
import { authOptions } from '../../../../lib/authOption';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard');
  }
  return <Signin />;
};

export default SigninPage;
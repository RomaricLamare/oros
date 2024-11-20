import { Box, Button, TextField, Typography } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { LOGIN } from '@/requests/queries/auth.queries';
import { redirect } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { client } from '../_app';
import { useRouter } from 'next/router'
import LoginCommon from "@/components/LoginCommon"
const Login: React.FC = () => {
  const router = useRouter()

  const onCompleted =  async (data: any) => {
    if (data.login.success) {
      await client.refetchQueries({include:["UserInfos"]});
      router.push('/');
    }
  }
  const showRegister = () => {
      router.push("/auth/register")
  }
  
  return <LoginCommon onCompleted={onCompleted} showRegister={showRegister}/>
  
};

export default Login;

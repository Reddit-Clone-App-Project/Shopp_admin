import React, { useEffect } from 'react'
import Logo from '../assets/logo.svg';
import LoginForm from '../features/LoginUser/LoginForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../redux/store';

const LoginPage = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.loginReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='bg-black w-full h-screen flex flex-col items-center justify-center text-white space-y-6'>
      <img src={Logo} alt="Logo" />
      <LoginForm />
    </div>
  )
}

export default LoginPage
import React from 'react'
import Logo from '../assets/logo.svg';
import LoginForm from '../features/LoginUser/LoginForm';

const LoginPage = () => {

  return (
    <div className='bg-black w-full h-screen flex flex-col items-center justify-center text-white space-y-6'>
      <img src={Logo} alt="Logo" />
      <LoginForm />
    </div>
  )
}

export default LoginPage
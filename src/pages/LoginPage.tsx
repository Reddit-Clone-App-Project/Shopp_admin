import React from 'react'
import Logo from '../assets/logo.svg';
import LoginForm from '../features/LoginUser/LoginForm';

const LoginPage = () => {

  const handleSubmit = (email: string, password: string) => {
    // Handle login logic here
  }

  return (
    <div className='bg-black w-full h-screen flex flex-col items-center justify-center text-white space-y-6'>
      <img src={Logo} alt="Logo" />
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default LoginPage
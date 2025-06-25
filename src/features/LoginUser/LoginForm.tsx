import React, { useState } from 'react'

export type LoginFormProps = {
    onSubmit: (email: string, password: string) => void;
}

const LoginForm = ({onSubmit} : LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-2'>
        <div className='flex flex-col items-center justify-center space-y-0.5'>
        <label htmlFor="email">Email:</label>
        <input
        className='bg-white text-black rounded-2xl w-3xs px-2'
            id="email" 
            type="email" 
            placeholder="Email"
            required 
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        </div>
        
        <div className='flex flex-col items-center justify-center mt-4 space-y-0.5'>
            <label htmlFor="password">Password:</label>
            <input
                className='bg-white text-black rounded-2xl w-3xs px-2'
                id="password"
                type="password"
                placeholder="Password"
                required
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit" className='bg-purple-900 text-white rounded-2xl h-8 w-24 mt-5 hover:bg-purple-800 transition-colors duration-200 cursor-pointer'>Login</button>
    </form>
  )
}

export default LoginForm
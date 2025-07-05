import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleLogin } from './LoginSlice';
import type { AppDispatch, RootState } from '../../redux/store';

export type LoginFormProps = {
    onSubmit: (email: string, password: string) => void;
}

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/home';

  const { status, error, isLoggedIn } = useSelector((state: RootState) => state.loginReducer);

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try{
      const accessToken = await dispatch(handleLogin({ email, password })).unwrap();
    
      if(accessToken) {
        toast.success('Login successful!');        
        navigate(from, { replace: true });
      }
    }
    catch(err: any) {
      const errorMsg = err?.message || 'Login failed. Please try again.';
      toast.error(errorMsg);
    }
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
        <button 
          type="submit" 
          disabled={!email || !password || status === 'loading'}
          className='bg-purple-900 text-white rounded-2xl h-8 w-24 mt-5 hover:bg-purple-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        >
            {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
    </form>
  )
}

export default LoginForm
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleLogin, handleLoginShipper, handleLoginStorage } from './LoginSlice';
import type { AppDispatch, RootState } from '../../redux/store';

export type LoginFormProps = {
    onSubmit: (email: string, password: string) => void;
}

const LoginForm = () => {
  const [roleSelection, setRoleSelection] = useState<'admin' | 'shipper' | 'storage'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, isLoggedIn, role } = useSelector((state: RootState) => state.loginReducer);
  const from = location.state?.from || ((role === 'normal' || role === 'super') ? '/admin' : '/storage');


  useEffect(() => {
    if(isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try{
      let accessToken;

      switch(roleSelection){
        case 'admin':
          accessToken = await dispatch(handleLogin({ email, password }));
          break;
        case 'shipper':
          accessToken = await dispatch(handleLoginShipper({ email, password }));
          break;
        case 'storage':
          accessToken = await dispatch(handleLoginStorage({ email, password }));
          break;
      }
    
      if(accessToken) {
        toast.success('Login successful!');        
        navigate('/home', { replace: true });
      }
    }
    catch(err: any) {
      const errorMsg = err?.message || 'Login failed. Please try again.';
      toast.error(errorMsg);
    }
  }

  return (
    <>
      <p className='m-0'>Login as:</p>
      <div className='flex items-center gap-4'>
        <button onClick={() => setRoleSelection('admin')} className={`bg-gray-600 text-white rounded-2xl h-8 w-24 mt-5 hover:bg-purple-800 transition-colors duration-200 cursor-pointer ${roleSelection === 'admin' ? 'bg-purple-800' : ''}`}>Admin</button>
        <button onClick={() => setRoleSelection('shipper')} className={`bg-gray-600 text-white rounded-2xl h-8 w-24 mt-5 hover:bg-purple-800 transition-colors duration-200 cursor-pointer ${roleSelection === 'shipper' ? 'bg-purple-800' : ''}`}>Shipper</button>
        <button onClick={() => setRoleSelection('storage')} className={`bg-gray-600 text-white rounded-2xl h-8 w-24 mt-5 hover:bg-purple-800 transition-colors duration-200 cursor-pointer ${roleSelection === 'storage' ? 'bg-purple-800' : ''}`}>Storage</button>
      </div>

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
    </>
  )
}

export default LoginForm
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import {loginSuccess, logout, setLoading} from '../store/slices/authSlice';
import { User } from '../types/auth.types';

export const useAuthSync = () => {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
      if (isAuthenticated && auth0User) {
        console.log('tr')
      const user: User = {
        id: auth0User.sub || '',
        email: auth0User.email || '',
        name: auth0User.name || auth0User.email || '',
        picture: auth0User.picture,
        loginType: getLoginType(auth0User.sub || ''),
      };
      dispatch(loginSuccess(user));
    } else if (!isAuthenticated && !isLoading) {
      dispatch(logout());
    }
  }, [isAuthenticated, auth0User, isLoading, dispatch]);
};

const getLoginType = (sub: string): 'email' | 'google' | 'facebook' | 'apple' => {
  if (sub.includes('google')) return 'google';
  if (sub.includes('facebook')) return 'facebook';
  if (sub.includes('apple')) return 'apple';
  return 'email';
};

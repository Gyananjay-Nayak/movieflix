import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm/LoginForm';
import SocialLogin from '../../components/auth/SocialLogin/SocialLogin';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.background}></div>
      
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.logo}>
            <h1>PixelPlay</h1>
          </div>

          <h2 className={styles.title}>Sign In</h2>
          <p className={styles.subtitle}>Welcome back! Please login to your account.</p>

          <LoginForm />
          
          <SocialLogin />

          <div className={styles.signupLink}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

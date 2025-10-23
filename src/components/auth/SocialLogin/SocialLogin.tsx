import React from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { IconBaseProps } from "react-icons";
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../../common/Button/Button';
import styles from './SocialLogin.module.scss';

const FaGoogleIcon = FaGoogle as React.FC<IconBaseProps>;
const FaFacebookIcon = FaFacebook as React.FC<IconBaseProps>;
const FaAppleIcon = FaApple as React.FC<IconBaseProps>;

const SocialLogin: React.FC = () => {

     const { loginWithPopup, isLoading } = useAuth0();

  const handleSocialLogin = async (connection: string) => {
    try {
      await loginWithPopup({
        authorizationParams: {
          connection: connection,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div className={styles.socialLogin}>
      <div className={styles.divider}>
        <span>OR</span>
      </div>

      <div className={styles.socialButtons}>
        <Button
          variant="secondary"
          fullWidth
          disabled={isLoading}
          onClick={() => handleSocialLogin('google-oauth2')}
          className={styles.socialButton}
        >
          <FaGoogleIcon className={styles.icon} />
          Continue with Google
        </Button>

        <Button
          variant="secondary"
          disabled={isLoading}
          fullWidth
          onClick={() => handleSocialLogin('Facebook')}
          className={styles.socialButton}
        >
          <FaFacebookIcon className={styles.icon} />
          Continue with Facebook
        </Button>

        <Button
          variant="secondary"
          disabled={isLoading}
          fullWidth
          onClick={() => handleSocialLogin('Apple')}
          className={styles.socialButton}
        >
          <FaAppleIcon className={styles.icon} />
          Continue with Apple
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;

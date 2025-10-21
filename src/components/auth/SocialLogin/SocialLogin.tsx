import React from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import styles from './SocialLogin.module.scss';

const SocialLogin: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    // Just UI for now - will implement later
    console.log(`${provider} login clicked`);
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
          onClick={() => handleSocialLogin('Google')}
          className={styles.socialButton}
        >
          <FaGoogle className={styles.icon} />
          Continue with Google
        </Button>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleSocialLogin('Facebook')}
          className={styles.socialButton}
        >
          <FaFacebook className={styles.icon} />
          Continue with Facebook
        </Button>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleSocialLogin('Apple')}
          className={styles.socialButton}
        >
          <FaApple className={styles.icon} />
          Continue with Apple
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;

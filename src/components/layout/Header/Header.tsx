import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '../../../store/hooks';
import { FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { logout } = useAuth0();
  const { user } = useAppSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>MOVIEFLIX</h1>

        <div className={styles.profile}>
          <button 
            className={styles.profileButton}
            onClick={() => setShowMenu(!showMenu)}
          >
            {user?.picture ? (
              <img src={user.picture} alt={user.name} className={styles.avatar} />
            ) : (
              <FaUserCircle className={styles.avatarIcon} />
            )}
          </button>

          {showMenu && (
            <div className={styles.dropdown}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{user?.name}</p>
                <p className={styles.userEmail}>{user?.email}</p>
              </div>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import styles from "./Header.module.scss";

// Type fix for Icons
const FaUserCircleIcon = FaUserCircle as React.FC<IconBaseProps>;
const FaBarsIcon = FaBars as React.FC<IconBaseProps>;
const FaTimesIcon = FaTimes as React.FC<IconBaseProps>;

const Header: React.FC = () => {
  const { logout } = useAuth0();
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    setShowMenu(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            MOVIEFLIX
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/"
              className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
            >
              Home
            </Link>
            <Link
              to="/movies/popular"
              className={`${styles.link} ${
                isActive("/movies/popular") ? styles.active : ""
              }`}
            >
              Popular
            </Link>
            <Link
              to="/movies/now-playing"
              className={`${styles.link} ${
                isActive("/movies/now-playing") ? styles.active : ""
              }`}
            >
              Now Playing
            </Link>
            <Link
              to="/movies/upcoming"
              className={`${styles.link} ${
                isActive("/movies/upcoming") ? styles.active : ""
              }`}
            >
              Upcoming
            </Link>
            <Link
              to="/movies/top-rated"
              className={`${styles.link} ${
                isActive("/movies/top-rated") ? styles.active : ""
              }`}
            >
              Top Rated
            </Link>
            <Link
              to="/favorites"
              className={`${styles.link} ${
                isActive("/favorites") ? styles.active : ""
              }`}
            >
              Favorites
            </Link>
          </nav>

          <div className={styles.rightSection}>
            <button
              className={styles.menuButton}
              onClick={() => setShowSideNav(!showSideNav)}
            >
              {showSideNav ? <FaTimesIcon /> : <FaBarsIcon />}
            </button>
            <div className={styles.profile}>
              <button
                className={styles.profileButton}
                onClick={() => setShowMenu(!showMenu)}
              >
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className={styles.avatar}
                  />
                ) : (
                  <FaUserCircleIcon className={styles.avatarIcon} />
                )}
              </button>

              {showMenu && (
                <div className={styles.dropdown}>
                  <p className={styles.userName}>{user?.name}</p>
                  <p className={styles.userEmail}>{user?.email}</p>
                  <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showSideNav && (
        <div className={styles.overlay} onClick={() => setShowSideNav(false)} />
      )}

      <nav className={`${styles.sideNav} ${showSideNav ? styles.open : ""}`}>
        <button
          className={styles.closeButton}
          onClick={() => setShowSideNav(false)}
        >
          <FaTimesIcon />
        </button>

        <Link
          to="/"
          className={`${styles.sideLink} ${isActive("/") ? styles.active : ""}`}
          onClick={() => setShowSideNav(false)}
        >
          Home
        </Link>
        <Link
          to="/movies/popular"
          className={`${styles.sideLink} ${
            isActive("/movies/popular") ? styles.active : ""
          }`}
          onClick={() => setShowSideNav(false)}
        >
          Popular
        </Link>
        <Link
          to="/movies/now-playing"
          className={`${styles.sideLink} ${
            isActive("/movies/now-playing") ? styles.active : ""
          }`}
          onClick={() => setShowSideNav(false)}
        >
          Now Playing
        </Link>
        <Link
          to="/movies/upcoming"
          className={`${styles.sideLink} ${
            isActive("/movies/upcoming") ? styles.active : ""
          }`}
          onClick={() => setShowSideNav(false)}
        >
          Upcoming
        </Link>
        <Link
          to="/movies/top-rated"
          className={`${styles.sideLink} ${
            isActive("/movies/top-rated") ? styles.active : ""
          }`}
          onClick={() => setShowSideNav(false)}
        >
          Top Rated
        </Link>
        <Link
          to="/favorites"
          className={`${styles.sideLink} ${
            isActive("/favorites") ? styles.active : ""
          }`}
          onClick={() => setShowSideNav(false)}
        >
          Favorites
        </Link>
      </nav>
    </>
  );
};

export default Header;

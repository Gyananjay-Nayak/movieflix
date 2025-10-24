import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', fullPage = false }) => {
  const loaderContent = <div className={`${styles.loader} ${styles[size]}`}></div>;

  if (fullPage) {
    return <div className={styles.fullPageLoader}>{loaderContent}</div>;
  }

  return loaderContent;
};

export default Loader;

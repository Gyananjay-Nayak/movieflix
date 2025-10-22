import React from 'react';
import Header from '../../components/layout/Header/Header';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Header />
      
      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Popular Movies</h2>
          <div className={styles.movieGrid}>
            <p className={styles.placeholder}>Loading movies...</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Now Playing</h2>
          <div className={styles.movieGrid}>
            <p className={styles.placeholder}>Loading movies...</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming</h2>
          <div className={styles.movieGrid}>
            <p className={styles.placeholder}>Loading movies...</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Top Rated</h2>
          <div className={styles.movieGrid}>
            <p className={styles.placeholder}>Loading movies...</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

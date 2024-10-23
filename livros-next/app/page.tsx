import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Menu } from '@/componentes/Menu';

const Home: React.FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Loja Next</title>
        <meta name="description" content="Bem-vindo à loja Next!" />
      </Head>
      <Menu></Menu>
      <main className={styles.main}>
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
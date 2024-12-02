import React, { useEffect, useState } from 'react';
import styles from './UserPage.module.css';

const UserPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    } else {
      alert('Você não está logado!');
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className={styles.container}>
      <h1>Bem-vindo!</h1>
      <div className={styles.tokenBox}>
        <p><strong>Seu Token:</strong> {token}</p>
      </div>
      <button onClick={handleLogout} className={styles.button}>Sair</button>
    </div>
  );
};

export default UserPage;

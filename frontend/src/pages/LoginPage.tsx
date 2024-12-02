import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Para armazenar mensagens de erro
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // Exibe mensagem de erro do backend
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/user');
    } catch {
      setError('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>} {/* Exibe erro, se existir */}
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <a href="/register" className={styles.link}>Criar uma conta</a>
    </div>
  );
};

export default LoginPage;

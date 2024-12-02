import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Para mensagens de erro
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // Exibe mensagem de erro retornada pelo backend
        return;
      }

      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch {
      setError('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registrar</h2>
      {error && <p className={styles.error}>{error}</p>} {/* Exibe mensagens de erro */}
      <form className={styles.form} onSubmit={handleRegister}>
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
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
      <a href="/login" className={styles.link}>Já tem uma conta? Faça login</a>
    </div>
  );
};

export default RegisterPage;

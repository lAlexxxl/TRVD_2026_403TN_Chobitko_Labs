import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { LogIn, Lock, User } from 'lucide-react'; // Іконки для стилю

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Відправляємо запит на твій .NET бекенд
      const response = await api.post('/auth/login', {
        username: username,
        password: password
      });

      // Зберігаємо JWT токен
      localStorage.setItem('token', response.data.token);
      
      // Перенаправляємо в кабінет (на сторінку ігор)
      navigate('/games');
    } catch (err) {
      // Виводимо помилку, якщо логін/пароль не підійшли
      const message = err.response?.data || 'Невірний логін або пароль';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <LogIn size={40} color="#3498db" />
          <h2 style={styles.title}>Вхід у GameVault</h2>
        </div>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}><User size={16} /> Логін</label>
            <input 
              type="text" 
              placeholder="Введіть ваш нікнейм"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}><Lock size={16} /> Пароль</label>
            <input 
              type="password" 
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            style={loading ? {...styles.button, opacity: 0.7} : styles.button}
          >
            {loading ? 'Перевірка...' : 'Увійти'}
          </button>
        </form>
        
        <p style={styles.footer}>
          Ще немає акаунту? <Link to="/register" style={styles.link}>Створити зараз</Link>
        </p>
      </div>
    </div>
  );
};

// Професійні стилі
const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' },
  card: { background: '#fff', padding: '2.5rem', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  header: { textAlign: 'center', marginBottom: '1.5rem' },
  title: { margin: '10px 0', color: '#2c3e50' },
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '1.2rem', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '5px', fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outlineColor: '#3498db' },
  button: { background: '#3498db', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' },
  error: { color: '#e74c3c', background: '#fdeaea', padding: '10px', borderRadius: '8px', marginBottom: '1.2rem', textAlign: 'center', fontSize: '0.9rem' },
  footer: { textAlign: 'center', marginTop: '1.5rem', color: '#7f8c8d' },
  link: { color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }
};

export default LoginPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserPlus, Lock, User } from 'lucide-react'; // Іконки для реєстрації

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // ВАША ВАЛІДАЦІЯ: мінімум 8 символів
    if (password.length < 8) {
      alert("❌ Пароль занадто короткий (мінімум 8 символів)");
      return;
    }

    setLoading(true);
    try {
      // Відправляємо дані на .NET бекенд
      await api.post('/auth/register', {
        username: username,
        password: password
      });

      alert("✅ Реєстрація успішна! Тепер ви можете увійти.");
      navigate('/login'); // Перекидаємо на сторінку входу
    } catch (err) {
      const message = err.response?.data || "Помилка реєстрації. Можливо, такий логін уже зайнятий.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <UserPlus size={40} color="#3498db" />
          <h2 style={styles.title}>Реєстрація у GameVault</h2>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}><User size={16} /> Новий логін</label>
            <input 
              type="text" 
              placeholder="Придумайте нікнейм"
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
              placeholder="Мінімум 8 символів"
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
            {loading ? 'Створення...' : 'Зареєструватися'}
          </button>
        </form>

        <p style={styles.footer}>
          Вже маєте акаунт? <Link to="/login" style={styles.link}>Увійти</Link>
        </p>
      </div>
    </div>
  );
};

// Ті самі стилі, що й у LoginPage для ідеального вигляду
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

export default RegisterPage;
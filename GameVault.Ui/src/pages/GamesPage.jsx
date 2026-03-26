import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Star, Trash2, PlusCircle, Minus, Plus } from 'lucide-react';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ title: '', genre: '', rating: 5 });

  const fetchGames = async () => {
    try {
      const res = await api.get('/games');
      setGames(res.data);
    } catch (err) {
      console.error("Помилка завантаження ігор", err);
    }
  };

  useEffect(() => { fetchGames(); }, []);

  const addGame = async (e) => {
    e.preventDefault();
    await api.post('/games', newGame);
    setNewGame({ title: '', genre: '', rating: 5 });
    fetchGames();
  };

  const deleteGame = async (id) => {
    await api.delete(`/games/${id}`);
    fetchGames();
  };

  // --- НОВА ФУНКЦІЯ ДЛЯ ЗМІНИ РЕЙТИНГУ ---
  const updateRating = async (game, delta) => {
    const updatedRating = Math.min(10, Math.max(1, game.rating + delta)); // Обмежуємо від 1 до 10
    
    try {
      // Відправляємо PUT запит на бекенд
      await api.put(`/games/${game.id}`, {
        ...game,
        rating: updatedRating
      });
      fetchGames(); // Оновлюємо список
    } catch (err) {
      alert("Не вдалося оновити оцінку");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 Моя Колекція GameVault</h1>

      {/* Форма додавання */}
      <form onSubmit={addGame} style={styles.addForm}>
        <input 
          placeholder="Назва гри" 
          value={newGame.title} 
          onChange={e => setNewGame({...newGame, title: e.target.value})} 
          required 
          style={styles.input}
        />
        <input 
          placeholder="Жанр" 
          value={newGame.genre} 
          onChange={e => setNewGame({...newGame, genre: e.target.value})} 
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}><PlusCircle size={20} /> Додати</button>
      </form>

      {/* Список ігор */}
      <div style={styles.grid}>
        {games.map(g => (
          <div key={g.id} style={styles.card}>
            <h3>{g.title}</h3>
            <p style={styles.genre}>{g.genre}</p>
            
            <div style={styles.ratingRow}>
              <button onClick={() => updateRating(g, -1)} style={styles.rateBtn}><Minus size={14}/></button>
              <span style={styles.ratingText}>⭐ {g.rating} / 10</span>
              <button onClick={() => updateRating(g, 1)} style={styles.rateBtn}><Plus size={14}/></button>
            </div>

            <button onClick={() => deleteGame(g.id)} style={styles.deleteBtn}>
              <Trash2 size={18} /> Видалити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '1000px', margin: '0 auto' },
  title: { textAlign: 'center', color: '#2c3e50', marginBottom: '30px' },
  addForm: { display: 'flex', gap: '15px', marginBottom: '40px', background: '#ecf0f1', padding: '20px', borderRadius: '12px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #bdc3c7', flex: 1 },
  addBtn: { background: '#2ecc71', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  card: { background: 'white', border: '1px solid #ddd', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' },
  genre: { color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '15px' },
  ratingRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' },
  ratingText: { fontSize: '1.1rem', fontWeight: 'bold' },
  rateBtn: { background: '#f1f2f6', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  deleteBtn: { background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', margin: '0 auto', fontSize: '0.9rem' }
};

export default GamesPage;
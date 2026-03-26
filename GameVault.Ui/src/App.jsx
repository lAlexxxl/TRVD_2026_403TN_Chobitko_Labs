import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Імпортуємо сторінки
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import GamesPage from "./pages/GamesPage.jsx";

// Імпортуємо компоненти
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar /> 
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/games" element={
            <ProtectedRoute>
              <GamesPage />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/games" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
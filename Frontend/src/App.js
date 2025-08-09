import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import DataManagement from "./components/DataManagement";
import Analytics from "./components/Analytics";
import PlayerStats from "./components/PlayerStats";
import InjuryReport from "./components/InjuryReport";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') !== null
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-container">
            <div className="brand-section">
              <h1 className="brand-title">Sports Management System</h1>
              <span className="brand-subtitle">Professional Sports Analytics Platform</span>
            </div>
            {isAuthenticated && (
              <nav className="main-navigation">
                <div className="nav-links">
                  <Link to="/home" className="nav-link">
                    <span className="nav-icon">📊</span>
                    Dashboard
                  </Link>
                  <Link to="/player-stats" className="nav-link">
                    <span className="nav-icon">🏃</span>
                    Player Stats
                  </Link>
                  <Link to="/injuries" className="nav-link">
                    <span className="nav-icon">🏥</span>
                    Injury Report
                  </Link>
                  <Link to="/manage" className="nav-link">
                    <span className="nav-icon">⚙️</span>
                    Data Management
                  </Link>
                  <Link to="/analytics" className="nav-link">
                    <span className="nav-icon">📈</span>
                    Analytics
                  </Link>
                </div>
                <button 
                  onClick={handleLogout}
                  className="logout-button btn-danger"
                >
                  Logout
                </button>
              </nav>
            )}
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/injuries"
              element={isAuthenticated ? <InjuryReport /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/player-stats"
              element={isAuthenticated ? <PlayerStats /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/manage"
              element={isAuthenticated ? <DataManagement /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/analytics"
              element={isAuthenticated ? <Analytics /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
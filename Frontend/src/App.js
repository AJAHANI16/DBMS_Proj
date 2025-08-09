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
          <div className="container">
            <div className="header-content">
              <div className="brand">
                <h1 className="brand-title">⚡ Sports Management Pro</h1>
                <span className="brand-subtitle">Advanced Analytics Platform</span>
              </div>
              {isAuthenticated && (
                <nav className="main-nav">
                  <Link to="/home" className="nav-link">
                    🏠 Dashboard
                  </Link>
                  <Link to="/player-stats" className="nav-link">
                    👤 Player Stats
                  </Link>
                  <Link to="/injuries" className="nav-link">
                    🏥 Injury Report
                  </Link>
                  <Link to="/manage" className="nav-link">
                    📊 Data Management
                  </Link>
                  <Link to="/analytics" className="nav-link">
                    📈 Analytics
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm logout-btn"
                  >
                    🚪 Logout
                  </button>
                </nav>
              )}
            </div>
          </div>
        </header>
        <main className="app-main">
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
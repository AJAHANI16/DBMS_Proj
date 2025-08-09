import React, { useState } from "react";
import axios from "axios";
import ResultList from "./ResultList";
import "./Home.css";

function Home() {
  const [teamName, setTeamName] = useState("");
  const [week, setWeek] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get JWT token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      if (teamName) params.append("team", teamName);
      if (week) params.append("week", week);
      
      const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
      const response = await axios.get(
        `${apiUrl}/api/games?${params.toString()}`,
        { headers: getAuthHeaders() }
      );
      
      setResults(response.data);
    } catch (err) {
      console.error("Error:", err.toString());
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        setError("Failed to fetch data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">🏈 Team Analytics Dashboard</h2>
          <p className="page-subtitle">
            Search and analyze team performance data across different weeks and seasons
          </p>
        </div>

        <div className="content-grid">
          <div className="search-section">
            <div className="card">
              <div className="card-header">
                <h3>🔍 Search Filters</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="search-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teamName" className="form-label">Team Name</label>
                      <input
                        id="teamName"
                        type="text"
                        className="form-control"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter team name (e.g., Dallas Cowboys)"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="week" className="form-label">Week Number</label>
                      <input
                        id="week"
                        type="number"
                        className="form-control"
                        value={week}
                        onChange={(e) => setWeek(e.target.value)}
                        placeholder="Enter week number (optional)"
                        min="1"
                        max="18"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>⏳ Searching...</span>
                    ) : (
                      <span>🔎 Search Games</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="results-section">
            {error && (
              <div className="alert alert-error">
                <span>⚠️ {error}</span>
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <h3>📊 Search Results</h3>
                {results.length > 0 && (
                  <span className="badge">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </span>
                )}
              </div>
              <div className="card-body">
                <ResultList results={results} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>⚡ Quick Actions</h3>
          <div className="action-grid">
            <a href="/analytics" className="action-card">
              <div className="action-icon">📈</div>
              <h4>View Analytics</h4>
              <p>Access detailed performance analytics and statistics</p>
            </a>
            <a href="/player-stats" className="action-card">
              <div className="action-icon">👤</div>
              <h4>Player Stats</h4>
              <p>Browse individual player statistics and records</p>
            </a>
            <a href="/injuries" className="action-card">
              <div className="action-icon">🏥</div>
              <h4>Injury Reports</h4>
              <p>Monitor team health and injury status updates</p>
            </a>
            <a href="/manage" className="action-card">
              <div className="action-icon">⚙️</div>
              <h4>Data Management</h4>
              <p>Manage teams, players, and game data</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
      
      if (isRegistering) {
        // Register new user
        await axios.post(`${apiUrl}/auth/register`, { username, password });
        setError('');
        setIsRegistering(false);
        alert('Registration successful! Please log in.');
      } else {
        // Login existing user
        const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
        
        // Store JWT token in localStorage
        localStorage.setItem('token', response.data.access_token);
        
        onLogin();
        navigate('/home');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      if (err.response?.status === 409) {
        setError('Username already exists');
      } else if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card card">
          <div className="card-header text-center">
            <h2 className="login-title">
              {isRegistering ? '📝 Create Account' : '🔐 Welcome Back'}
            </h2>
            <p className="login-subtitle">
              {isRegistering 
                ? 'Join our Sports Management Platform' 
                : 'Sign in to access your dashboard'
              }
            </p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="alert alert-error">
                  <span>⚠️ {error}</span>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>⏳ {isRegistering ? 'Creating Account...' : 'Signing In...'}</span>
                ) : (
                  <span>{isRegistering ? '✨ Register' : '🚀 Login'}</span>
                )}
              </button>
            </form>
          </div>
          <div className="card-footer text-center">
            <button 
              type="button" 
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              {isRegistering ? '👈 Already have an account? Login' : '📝 Need an account? Register'}
            </button>
          </div>
        </div>
        
        <div className="demo-credentials">
          <h4>🎯 Demo Credentials</h4>
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

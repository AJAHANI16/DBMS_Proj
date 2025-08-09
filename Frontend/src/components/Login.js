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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="login-subtitle">
            {isRegistering 
              ? 'Join our sports management platform' 
              : 'Sign in to your account'
            }
          </p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            placeholder="Enter your username"
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>
        
        <div className="login-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading}
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
          
          <button 
            type="button" 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="toggle-mode"
            disabled={isLoading}
          >
            {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
          </button>
        </div>
        
        <div className="login-form-footer">
          <div className="security-badge">
            Secure SSL Connection
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

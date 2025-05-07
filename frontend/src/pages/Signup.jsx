import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer', // default role
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);

      // 🟣 Store token & role
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      // 🟣 Navigate based on role
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/profile');
      }

    } catch (err) {
      console.error('Signup failed:', err);
    }
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: '400px', maxWidth: '100%' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#003366', textAlign: 'center', marginBottom: '20px' }}>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={{ fontSize: '1.1rem', color: '#333', display: 'block', marginBottom: '8px' }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                outline: 'none',
                transition: '0.3s ease-in-out',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ fontSize: '1.1rem', color: '#333', display: 'block', marginBottom: '8px' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                outline: 'none',
                transition: '0.3s ease-in-out',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ fontSize: '1.1rem', color: '#333', display: 'block', marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                outline: 'none',
                transition: '0.3s ease-in-out',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
  <label htmlFor="role">Role</label>
  <select
    id="role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    required
  >
    <option value="customer">Customer</option>
    <option value="admin">Admin</option>
  </select> {/* ✅ Proper closing tag */}
</div>

          <button
            type="submit"
            style={{
              backgroundColor: '#ff6600',
              color: 'white',
              padding: '12px 20px',
              width: '100%',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e65c00'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6600'}
          >
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#0073e6', textDecoration: 'none' }}>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Employee App</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;

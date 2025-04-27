import React, { useState } from 'react';
import axios from 'axios';
import '../css/AdminSignUp.css';

const AdminSignUp = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/signup', {
        name,
        email,
        password,
      });

      const { token, admin } = response.data;

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminInfo', JSON.stringify(admin));
      setIsLoggedIn(true);

      setMessage('Registration Successful');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Signup failed. Try again!');
    }
  };

  return (
    <div className="signup-form">
      <h2>Admin SignUp</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminSignUp;
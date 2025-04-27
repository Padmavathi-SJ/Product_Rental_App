import React, { useState } from 'react';
import axios from 'axios';
import '../css/UserSignUp.css'

const UserSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', {
        name,
        email,
        password,
      });
      setMessage(response.data.msg || 'Registration Successful');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Signup failed. Try again!');
    }
  };

  return (
    <div className="signup-form">
      <h2>User SignUp</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserSignUp;

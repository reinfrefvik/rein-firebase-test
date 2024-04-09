import React, { useContext, useState } from 'react';
import './RegistrationForm.css'; // Import your CSS file for styling
import { AuthContext } from '../../contexts/authContexts';

const RegistrationForm = () => {
  const {createUser} = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if(password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    if(password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
  
    await createUser(email, password, name);
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleRegister}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;

import React, { useState } from 'react';
import './AddUser.css'; // Import your CSS file
import { auth } from '../../Firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createUser = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
        alert('Password must be at least 3 characters long');
        return;
    }


    const submittedData = { ...formData };
    console.log('Submitted Data:', submittedData);
    createUser(submittedData.email, submittedData.password);

    // Clear form fields
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <form className="my-form" onSubmit={handleSubmit}>
      <h1 className="register-user-title">Register new user</h1>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
        />
      </label>
      <button type="submit">Create user</button>
    </form>
  );
};

export default AddUserForm;

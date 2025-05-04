import React, { useState } from 'react';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        nic: formData.nic,
        email: formData.email,
        password: formData.password
      })
    });

    if (response.ok) {
      const result = await response.text();
      alert(result); // "Signup successful"
      navigate('/Login'); // Redirect to login
    } else {
      alert("Signup failed. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  return (
    <div className="container">
      <div className="logo-section">
        <div className="logo-circle">
          <img src="https://i.imgur.com/2B2gElk.png" alt="Logo" />
          <p>AUTOVANCE</p>
        </div>
      </div>
      <div className="form-box">
        <h2>SIGN-UP</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="text" name="nic" placeholder="NIC" onChange={handleChange} required />
          <input type="email" name="email" placeholder="E-MAIL" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
          <div className="btn-group">
            <button type="button" onClick={handleLoginRedirect}>LOGIN</button>
            <button type="submit">SIGN-UP</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

import React, { useState } from 'react';
import './Register.css';
import car from './car.mp4';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    date_of_birth: '',
    state: '',
    password: ''
  });
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowRePassword = () => setShowRePassword(!showRePassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setFormData({
      ...formData,
      password: newPassword
    });

    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long and contain symbols, digits, lowercase and uppercase letters');
    } else {
      setPasswordError('');
    }
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain symbols, digits, lowercase and uppercase letters');
    } else if (password !== rePassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
      try {
        await axios.post('http://localhost:8080/api/register', formData);
        alert('Registration successful!');
        navigate("/");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setRegistrationError('Account with this email already exists');
        } else {
          setRegistrationError('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className='register'>
        <video autoPlay muted className="vid-2">
          <source src={car} type="video/mp4" />
        </video>
        <div className="register-container">
          <div className="register-box" style={{ marginTop: '20px' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>State</label>
                <select name="state" value={formData.state} onChange={handleInputChange} required>
                  <option value="" disabled>Select your state</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Password</label>
                <Tooltip title="Password must be at least 8 characters long and contain symbols, digits, lowercase and uppercase letters">
                  <div className="password-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <i
                      className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={toggleShowPassword}
                    ></i>
                  </div>
                </Tooltip>
              </div>
              <div className="form-group">
                <label>Re-enter Password</label>
                <div className="password-container">
                  <input
                    type={showRePassword ? 'text' : 'password'}
                    value={rePassword}
                    onChange={handleRePasswordChange}
                    required
                  />
                  <i
                    className={`fas ${showRePassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={toggleShowRePassword}
                  ></i>
                </div>
                {passwordError && <p className="error">{passwordError}</p>}
              </div>
              {registrationError && <p className="error">{registrationError}</p>}
              <button type="submit" disabled={!!passwordError}>Register</button>
              <center><p style={{ marginTop: '20px' }}>Already have an account? <Link to="/" style={{ textDecoration: 'none', color: 'black' }} className='regg'>Login</Link></p></center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

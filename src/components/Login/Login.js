import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, Person as PersonIcon } from '@mui/icons-material';
import './Login.css';
import back from './lback.mp4';
import google from './google.png';
import facebook from './facebook.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (emailTouched) {
      validateEmail(email);
    }
    if (passwordTouched) {
      validatePassword(password);
    }
  }, [email, password, emailTouched, passwordTouched]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailTouched(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      try {
        const response = await axios.post('http://localhost:8080/api/login', {
          email,
          password
        });
        if (response.data === "Login successful") {
          sessionStorage.setItem('userEmail', email); // Store email in sessionStorage
          
          if (email.startsWith("mech.")) {
            navigate("/Mechmanage");
          } else if (email === "admin@quickservice.com") {
            navigate("/Admin");
          } else {
            navigate("/Welcome");
          }
        } else {
          setLoginError('Invalid credentials');
        }
      } catch (error) {
        setLoginError('Invalid credentials');
        console.error(error);
      }
    }
  };
  
  

  const isEmailInvalid = emailError && emailTouched;
  const isPasswordInvalid = passwordError && passwordTouched;

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <video autoPlay loop muted className="vid">
          <source src={back} type="video/mp4" />
        </video>
        <div className="login-box">
          <center>
            <div className="brandnameletter">QuickService</div>
            <div className="login-header">
              <h2>Login</h2>
              <PersonIcon className="person-icon" />
            </div>
          </center>
          <div className='login-section'>
            <form onSubmit={handleSubmit}>
              <div className={`input-group ${isEmailInvalid ? 'invalid' : ''}`}>
                <input
                  type="text"
                  id="email"
                  placeholder=" "
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className={`input-group ${isPasswordInvalid ? 'invalid' : ''}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label htmlFor="password">Password</label>
                <span className="toggle-password" onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
              <center>
                <button type="submit" className="login-button">Login</button>
                {loginError && <p className="error">{loginError}</p>}
                <a href="#" className="forgot-password">Forgot Password?</a>
                <p>Don't have an account? <Link to="/Register" className='signup'>Sign Up</Link></p>
                <Button
                  variant="outlined"
                  startIcon={<img src={facebook} alt="Facebook Icon" style={{ width: '20px', height: '20px' }} />}
                  style={{
                    color: 'black',
                    margin: '10px',
                    width: '260px',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    marginTop: '20px'
                  }}
                >
                  Continue with Facebook
                </Button>
                <br />
                <Button
                  variant="contained"
                  startIcon={<img src={google} alt="Google Icon" style={{ width: '20px', height: '20px' }} />}
                  style={{
                    border: 'none',
                    color: 'white',
                    margin: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '250px'
                  }}
                >
                  Continue with Google
                </Button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

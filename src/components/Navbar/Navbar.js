import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    state: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      const email = sessionStorage.getItem('userEmail');
      if (email) {
        setIsLoggedIn(true);
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${email}`);
          if (response.data) {
            setUsername(response.data.username);
            setProfileData({
              username: response.data.username,
              password: '',
              confirmPassword: '',
              state: response.data.state || '',
              dateOfBirth: response.data.dateOfBirth || ''
            });
          } else {
            setUsername('');
          }
        } catch (error) {
          setError('Failed to fetch user data');
          console.error('Error fetching user data:', error);
        }
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  const handleRestrictedLinkClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openProfileEdit = () => {
    setShowProfileEdit(true);
  };

  const closeProfileEdit = () => {
    setShowProfileEdit(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfileSave = async () => {
    if (profileData.password !== profileData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const email = sessionStorage.getItem('userEmail');
    try {
      const response = await axios.put(`http://localhost:8080/api/user/${email}`, {
        username: profileData.username,
        password: profileData.password,
        state: profileData.state,
        dateOfBirth: profileData.dateOfBirth
      });
      setUsername(response.data.username);
      closeProfileEdit();
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className='brandnameletterNav'>QuickService</div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={isOpen ? "line open" : "line"}></div>
        <div className={isOpen ? "line open" : "line"}></div>
        <div className={isOpen ? "line open" : "line"}></div>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <Link to="/CustHome" onClick={handleRestrictedLinkClick}><li>Home</li></Link>
        <Link to="/How" onClick={handleRestrictedLinkClick}><li>How-IT-Works</li></Link>
        <Link to="/Services" onClick={handleRestrictedLinkClick}><li>Services</li></Link>
        <Link to="/Bookings" onClick={handleRestrictedLinkClick}><li>Bookings</li></Link>
        <Link to="/about"><li>About Us</li></Link>
        <Link to="/Contact" onClick={handleRestrictedLinkClick}><li>Contact</li></Link>
        
        <li className="profile-info">
          {loading ? '' : (
            <div className="profile-container" onClick={openProfileEdit}>
              <BsPersonCircle className="profile-icon" />
              <span>{username || 'Guest'}</span>
            </div>
          )}
        </li>
        {isLoggedIn && (
          <li className="logout" onClick={handleLogout}>
            <i className="fas fa-door-open"></i> Logout
          </li>
        )}
      </ul>
      {showPopup && (
        <div className="help-section">
          <div className="popup-content-1">
            <p>Login to proceed further</p>
            <Link to="/" className='no-underline'>
              <button onClick={closePopup}>Login</button>
            </Link>
          </div>
        </div>
      )}
      {showProfileEdit && (
        <div className="profile-edit-popup">
          <div className="popup-content">
            <h3 style={{color:'black', marginBottom:'20px'}}>Edit Profile</h3>
            {error && <p className="error">{error}</p>}
            <table className="profile-edit-form">
              <tbody>
                <tr>
                  <td><label>Username:</label></td>
                  <td><input type="text" name="username" value={profileData.username} onChange={handleProfileChange} /></td>
                </tr>
                <tr>
                  <td><label>Password:</label></td>
                  <td><input type="password" name="password" value={profileData.password} onChange={handleProfileChange} /></td>
                </tr>
                <tr>
                  <td><label>Confirm Password:</label></td>
                  <td><input type="password" name="confirmPassword" value={profileData.confirmPassword} onChange={handleProfileChange} /></td>
                </tr>
                <tr>
                  <td><label>State:</label></td>
                  <td><input type="text" name="state" value={profileData.state} onChange={handleProfileChange} /></td>
                </tr>
                <tr>
                  <td><label>Date of Birth:</label></td>
                  <td><input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleProfileChange} /></td>
                </tr>
              </tbody>
            </table>
            <div className="popup-buttons">
              <button onClick={handleProfileSave} style={{marginBottom:'15px'}}>Save</button>
              <button onClick={closeProfileEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
    </nav>
  );
};

export default Navbar;

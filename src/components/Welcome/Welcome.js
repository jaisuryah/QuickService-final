import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Welcome.css';
import garage from './garage.jpg'; // Replace with the path to your garage image
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const WelcomePage = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      setLoading(true);
      setError('');
      const email = sessionStorage.getItem('userEmail');
      if (email) {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${email}`);
          if (response.data) {
            setUsername(response.data.username || ''); // Ensure username is a field in the response
          } else {
            setUsername(''); // Clear username if no data found
          }
        } catch (error) {
          setError('Failed to fetch user data');
          console.error('Error fetching user data:', error);
        }
      } else {
        setUsername('');
      }
      setLoading(false);
    };

    fetchUsername();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='welcome-container'>
        <img src={garage} alt='' className='garage-img' />
        <main className='main-content'>
          <section className="welcome-section">
            <h1 className='brandnameletterWel'>QuickService</h1>
            <h1 className='welcome-message'>
              Welcome{loading ? '...' : username ? `, ${username}` : ''}!
            </h1>
            <Link to="/CustHome">
              <button className='button0'>Book Service Now</button>
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default WelcomePage;

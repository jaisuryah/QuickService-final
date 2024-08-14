import React, { useState } from 'react';
import './Contact.css'; 
import { FaPhoneAlt, FaMapMarkerAlt, FaWrench, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from 'axios';
import Chatbot from '../ChatBot/Chatbot';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captchaToken) {
      try {
        const response = await axios.post('http://localhost:8080/api/contact', {
          name: e.target[0].value,
          email: e.target[1].value,
          phone: e.target[2].value,
          message: e.target[3].value,
        });
        if (response.status === 200) {
          setIsSubmitted(true);
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        }
      } catch (error) {
        alert("Failed to submit the form. Please try again.");
      }
    } else {
      alert("Please verify that you are not a robot.");
    }
  };
  
  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div>
    <Chatbot/>
      <Navbar />
      <center>
        <div className="contact-container">
          <div className="info-section">
            <div className="info-box">
              <FaPhoneAlt size={30} />
              <p>Mobile: +91 9988776655</p>
              <p>Assistance: 0427 245 566</p>
              <p>Weekdays: +91 8645236447</p>
            </div>
            <div className="info-box">
              <FaMapMarkerAlt size={30} />
              <p>51 Cross Street, Vanakam Road</p>
              <p>Archwood Lane</p>
              <p>Coimbatore, TN</p>
            </div>
            <div className="info-box">
              <FaWrench size={30} />
              <p>24/7 Assistance</p>
              <p>Call us and We will assist you</p>
              <p>We will be Faster than Light</p>
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="tel" placeholder="Your Phone" required />
            <textarea placeholder="Message" required />
    
            <div className="captcha-container">
              <HCaptcha
                sitekey="59d888c6-c342-4d86-9ac0-7196068a8c2e" 
                onVerify={onCaptchaChange}
              />
            </div>
            <button type="submit" className='button-3'>Send Message</button>
          </form>
          {showPopup && (
            <>
              <div className="overlay" />
              <div className="popup">
                <img src="https://media.tenor.com/bm8Q6yAlsPsAAAAj/verified.gif" alt="Verified" className="popup-gif" />
                <br/>
                <h2>We Received Your Feedback <br />
                  Thanks for contacting us!</h2>
              </div>
            </>
          )}
          <div className="social-media">
            <p>Follow Us:</p>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
          </div>
          <p className="privacy-info">
            Your information will be handled according to our <a href="/privacy-policy">Privacy Policy</a>.
          </p>
        </div>
      </center>
      <Footer />
    </div>
  );
};

export default ContactForm;

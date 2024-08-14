import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css';
import logo from './file1.png'; 

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-top'>
        <div className='footer-info'>
          <div className='info-item'>
            <p><i className="fas fa-map-marker-alt"></i>51 Cross Street,Vanakam Road <br></br>Archwood Lane,Coimbatore, TN</p>
          </div>
          <div className='info-item'>
            <p><i className="fas fa-phone-alt"></i> Feel Free to Call Us Now +91 9988776655</p>
          </div>
          <div className='info-item'>
            <p><i className="fas fa-truck"></i> 24/7 Roadside Assistance <br></br>0427 245 566</p>
          </div>
        </div>
      </div>
      <div className='footer-content'>
        <div className='footer-section about'>
        <Link to="/Contact" className='no-underline'> <h3 style={{fontSize:'30px',marginBottom:'20px'}}>Contact Us</h3></Link>
          <p>
          51 Cross Street,Vanakam Road<br />
          Archwood Lane, Coimbatore<br />
          TamilNadu<br/><br/>
            Mobile: +91 9988776655<br />
            Assistance: 0427 245 566<br />
            E-mail: quickservice@gmail.com
          </p>
        </div>
        <div className='footer-section services'>
         <Link to="/Services" className='no-underline'><h3 style={{fontSize:'30px',marginBottom:'20px'}}>Our Services</h3></Link>
          <ul>
            <li>Engine Diagnostics</li>
            <li>Lube, Oil and Filters</li>
            <li>Belts and Hoses</li>
            <li>Air Conditioning</li>
            <li>Brake Repair</li>
            <li>Tire and Wheel Services</li>
            <li>Other Car Services</li>
          </ul>
        </div>
        <div className='footer-section tags'>
          <h3 style={{fontSize:'30px',marginBottom:'20px'}}>Popular Tags</h3>
          <div className='tags'>
            <span>Belts</span>
            <span>Brakes</span>
            <span>Diagnostics</span>
            <span>Engine</span>
            <span>Filters</span>
            <span>Heating</span>
            <span>Oils</span>
            <span>Steering</span>
            <span>Suspension</span>
            <span>Tires</span>
            <span>Transmission</span>
          </div>
        </div>
        <div className='footer-section hours'>
          <h3 style={{fontSize:'30px',marginBottom:'20px'}}>Hours</h3>
          <p>Monday: 7:30am - 5:30pm</p>
          <p>Tuesday: 7:30am - 5:30pm</p>
          <p>Wednesday: 7:30am - 5:30pm</p>
          <p>Thursday: 7:30am - 5:30pm</p>
          <p>Friday: 7:30am - 5:30pm</p>
          <p>Saturday: 7:30am - 3:00pm</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2023 QuickService | All Rights Reserved</p>
        <div className='social-icons'>
          <a href="https://www.whatsapp.com"><WhatsAppIcon /></a>
          <a href="https://www.facebook.com"><FacebookIcon /></a>
          <a href="https://www.twitter.com"><TwitterIcon /></a>
          <a href="https://www.instagram.com"><InstagramIcon /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './CustHomePage.css';
import Footer from '../Footer/Footer';
import how1 from './how.png';
import TestimonialsCarousel from '../carousal/Carousal';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import PopupSection from '../Popup/PopupSection';
import LogosSlider from '../LogoSlider/LogoSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './Quick.png'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Chatbot from '../ChatBot/Chatbot';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "What services do you offer?", answer: "We offer a wide range of vehicle services including maintenance, repairs, and more." },
    { question: "How can I book a service?", answer: "You can book a service through our website by filling out the booking form." },
    { question: "Do you offer warranty on your services?", answer: "Yes, we provide a warranty on our services. Please contact us for more details about the warranty period and terms." },
    { question: "What is the estimated time for a service?", answer: "The estimated time for a service depends on the type of service being performed. Minor services may take a few hours, while major repairs may take longer." },
    { question: "What payment methods are accepted?", answer: "We accept various payment methods including credit/debit cards and cash." },
    { question: "Can I cancel or reschedule my appointment?", answer: "Yes, you can cancel or reschedule your appointment by contacting us directly." },
    { question: "Do you use genuine spare parts?", answer: "Yes, we use only genuine spare parts for all repairs and services to ensure the quality and longevity of your vehicle." },
    { question: "How do I contact customer support?", answer: "You can contact our customer support team through our website, email, or phone. Our contact details are available on the 'Contact Us' page." },
    { question: "Do you provide pick-up and drop-off services?", answer: "Yes, we offer pick-up and drop-off services for your convenience. Please provide your location details while booking." },
    { question: "Are your technicians certified and experienced?", answer: "Yes, our technicians are highly skilled, certified, and experienced in providing quality service for various car models." },
  ];

  const handleFAQClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-section">
    <section className="our-mission">
    <h2 className="section-title">OUR MISSION</h2>
    <hr className="section-divider" />
    <p className="section-description" >We offer a full range of garage services to vehicle owners located in Tucson area. All mechanic services are performed by highly qualified mechanics. We can handle any car problem.</p>
    <p className="section-description">We offer a full range of garage services to vehicle owners in Tucson. Our professionals know how to handle a wide range of car services. Whether you drive a passenger car or medium sized truck or SUV, our mechanics strive to ensure that your vehicle will be performing at its best before leaving our car shop.</p>
   <center><img src={logo} alt='logo'style={{width:'220px',height:'230px'}}/></center>
    <Link to="/About" className='no-underline'><button className="read-more-button">READ MORE</button></Link>
  </section>
      <h2 className="section-title">Frequently Asked Questions</h2>
      <hr className="section-divider" />
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => handleFAQClick(index)}
        >
          <h3>
            {faq.question}
            <FontAwesomeIcon 
              icon={index === activeIndex ? faChevronUp : faChevronDown} 
              className="icon"
            />
          </h3>
          <p>{faq.answer}</p>
          
        </div>
      ))}
    
    </section>
  );
};



const CustHomePage = () => {
  return (
    <div>
    <Chatbot/>
      <PopupSection />
      <Navbar />
      <div className="homepage-container">
        <main className="main-content">
          <section className="intro-section">
            <h1 className="intro-heading">Welcome to QuickService</h1>
            <p className="intro-text">Your one-stop solution for all your vehicle service needs. Book a service now and experience the best in class service.</p>
            <Link to="/Services" className="no-underline">  <button className="book-now-button">Book Service Now</button></Link>
          </section>
          <div className='imgbar'>
            <h1 className='brr'>QuickService<br />We Fix<br />While you Rest</h1>
          </div>

          <section className="clickable-sections">
            <button className="clickable-div">
              <Link to="/Services" className="no-underline">
                <h2>Book Service</h2>
                <p>Click to book a new service.</p>
              </Link>
            </button>

            <div className="clickable-div">
            <Link to="/Bookings" className="no-underline">
              <h2>Booked Services</h2>
              <p>Click to view your booked services.</p></Link>
            </div>
          </section>

          <center>
            <Link to="/Services" className="no-underline">
              <button className="view-all-button">
                View All Services
                <span className="arrow-icon">&#9654;</span>
              </button>
            </Link>
          </center>

          <section className="why-choose-us">
            <h2>Why Choose Us?</h2>
            <hr className="section-divider" />
            <p className="intro-text">We are one of the leading auto repair shops serving customers in India. All mechanic services are performed by highly qualified mechanics.</p>
            <div className="features">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-user"></i> 
                </div>
                <h3>Every Job is Personal</h3>
                <p>If you want the quality you would expect from the dealership, but with a more personal and friendly atmosphere, you have found it.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <h3>Best Materials</h3>
                <p>We have invested in all the latest specialist tools and diagnostic software that is specifically tailored for the software in your vehicle.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-truck"></i>
                </div>
                <h3>Professional Standards</h3>
                <p>Our auto repair shop is capable of servicing a variety of models. We only do the work that is needed to fix your problem.</p>
              </div>
            </div>
            <Link to="/About" className="read-more-button">Read More</Link>
          </section>

          <TestimonialsCarousel />
          
          <div className="faq-and-mission">
            <FAQSection />

          </div>

          <section className="vehicles-serviced">
            <h2 className="section-title">VEHICLES SERVICED</h2>
            <hr className="section-divider" />
            <p className="section-description">
              We provide top notch maintenance service for all types of vehicles.<br />
              We are certified to service and repair the following makes:
            </p>
          </section>

          <LogosSlider />
        </main>
        <img src={how1} alt='' style={{ width: '100%' }} />
        <Footer />
      </div>
    </div>
  );
};

export default CustHomePage;

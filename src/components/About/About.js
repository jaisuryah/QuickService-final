
import React, { useEffect, useState } from 'react';
import './About.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Chatbot from '../ChatBot/Chatbot';

const AboutUs = () => {
  const [stats, setStats] = useState({
    satisfaction: 0,
    carsRepaired: 0,
    tiresRepaired: 0,
    boltsTightened: 0,
  });

  useEffect(() => {
    const satisfactionInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        satisfaction: prevStats.satisfaction < 100 ? prevStats.satisfaction + 1 : 100,
      }));
    }, 20);

    const carsRepairedInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        carsRepaired: prevStats.carsRepaired < 35 ? prevStats.carsRepaired + 1 : 35,
      }));
    }, 150);

    const tiresRepairedInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        tiresRepaired: prevStats.tiresRepaired < 8852 ? prevStats.tiresRepaired + 10 : 8852,
      }));
    }, 10);

    const boltsTightenedInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        boltsTightened: prevStats.boltsTightened < 16842 ? prevStats.boltsTightened + 8 : 16842,
      }));
    }, 1);

    return () => {
      clearInterval(satisfactionInterval);
      clearInterval(carsRepairedInterval);
      clearInterval(tiresRepairedInterval);
      clearInterval(boltsTightenedInterval);
    };
  }, []);

  return (
    <div>
    <Chatbot/>
      <Navbar />
      <div className='image-bg'>
        <div className="about-us-container">
        <section className="section-1">
            <h1 className="title-1">About Us</h1>
            <div className="content-1">
              <div className="text-1">
                <p>We offer a full range of garage services to vehicle owners located in Tucson area. All mechanic services are performed by highly qualified mechanics. We can handle any car problem.</p>
                <p>We offer full range of garage services to vehicle owners in Tucson. Our professionals know how to handle a wide range of car services. Whether you drive a passenger car or medium sized truck or SUV, our mechanics strive to ensure that your vehicle will be performing at its best before leaving our car shop. Whether you drive a medium sized truck or passenger car or SUV, our mechanics strive to ensure.</p>
                <h2 className="subtitle-1">Why Choose Us</h2>
                <ul className="list-1">
                  <li>We make auto repair and maintenance more convenient for you</li>
                  <li>We are a friendly, helpful and professional group of people</li>
                  <li>Our professionals know how to handle a wide range of car services</li>
                  <li>We get the job done right — the first time</li>
                  <li>Same day service for most repairs and maintenance</li>
                </ul>
                <h2 className="subtitle-1">24/7 Roadside Assistance</h2>
                <ul className="list-1">
                <li>Tyre Puncture</li>
                <li>Flat Tire Change</li>
                <li>Battery Jump Start</li>
                <li>Fuel Delivery</li>
                <li>Winching/Extrication</li>
              </ul>
           <Link to="/Services" className='no-underline'><button className="button-2">Our Services</button></Link>
              </div>
              <div className="images">
                <img className="large-image" src="https://quanticalabs.com/wp_themes/carservice/files/2015/05/image_07-480x320.jpg" alt="Car Repair" />
                <div className="small-images">
                  <img src="https://quanticalabs.com/wp_themes/carservice/files/2015/05/image_02-570x380.jpg" alt="Car Repair" />
                  <img src="https://quanticalabs.com/wp_themes/carservice/files/2015/05/image_05.jpg" alt="Car Repair" />
                </div>
              </div>
            </div>
          </section>
          <section className="stats">
            <div className="stat">
              <h3>{stats.satisfaction}%</h3>
              <p>Customer Satisfaction</p>
            </div>
            <div className="stat">
              <h3>{stats.carsRepaired}</h3>
              <p>Cars Repaired Per Day</p>
            </div>
            <div className="stat">
              <h3>{stats.tiresRepaired}</h3>
              <p>Tires Repaired a Year</p>
            </div>
            <div className="stat">
              <h3>{stats.boltsTightened}</h3>
              <p>Tightened Bolts</p>
            </div>
          </section>
          <section className='trans'>
          <center><h1>Our Goal</h1>
          <h3>Our dedicated team strives to deliver exceptional customer satisfaction and peace of mind on the road.</h3></center>
          </section>
          <section className="company-overview">
            <center><h2>Company Overview</h2>
            <p>We can help you with everything from an oil change to an engine change. We can handle any problem on both foreign and domestic vehicles.</p></center>
            <div className="services-1">
              <div className="service-1">
                <i className="fas fa-music"></i>
                <h3>CAR AUDIO SERVICE</h3>
                <p>We provide expert installation and repair of car audio systems, ensuring high-quality sound and seamless integration with your vehicle.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-oil-can"></i>
                <h3>FREE OIL CHANGE</h3>
                <p>Enjoy a complimentary oil change with your service, ensuring your engine runs smoothly and efficiently.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-laptop-code"></i>
                <h3>ENGINE DIAGNOSTICS</h3>
                <p>Our advanced engine diagnostics services help identify and fix issues quickly to keep your vehicle running at its best.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-snowflake"></i>
                <h3>A/C RECHARGE</h3>
                <p>Keep your vehicle's air conditioning system in top condition with our professional A/C recharge service.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-parking"></i>
                <h3>PARKING SENSORS CALIBRATION</h3>
                <p>Ensure your parking sensors are accurately calibrated for optimal performance and safety.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-car-battery"></i>
                <h3>CAR BATTERY REPAIRS</h3>
                <p>Get your car battery checked and repaired to ensure your vehicle starts reliably every time.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;

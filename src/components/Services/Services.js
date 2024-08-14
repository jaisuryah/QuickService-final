  import React, { useState, useEffect } from 'react';
  import './Services.css'; 
  import { FaCar, FaMotorcycle } from 'react-icons/fa';
  import Footer from '../Footer/Footer';
  import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import Navbar from '../Navbar/Navbar';
  import PopupSection from '../Popup/PopupSection';


  import axios from 'axios';
import Chatbot from '../ChatBot/Chatbot';

  const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const Services = () => {
    const [showModal, setShowModal] = useState(false);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [customerEmail, setCustomerEmail] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [pickup_location, setPickupLocation] = useState('');
    const [showMap, setShowMap] = useState(false);
    const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
    const [draggableMarkerPosition, setDraggableMarkerPosition] = useState({ lat: 0, lng: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTab, setCurrentTab] = useState('car'); // Default tab is 'car'
    const [services, setServices] = useState([]); // State to hold services data
    const [paymentMethod, setPaymentMethod] = useState('');


    const [orderDetails, setOrderDetails] = useState({
      vehicle: '',
      vehicle_number: '',
      date: '',
      customer_name: '',
      customer_email: '',
      phone_number: '',
      license_number: '',
    });

    useEffect(() => {
      const fetchServices = async () => {
        const email = sessionStorage.getItem('userEmail');
        if (email) {
          setCustomerEmail(email);
        }
        try {
          const response = await axios.get('http://localhost:8080/api/all');
          setServices(response.data);
        } catch (error) {
          console.error('There was an error fetching the services!', error);
        }
      };

      fetchServices();
    }, []);

    const handleBookServiceClick = (service) => {
      setSelectedService(service);
      setShowModal(true);
    };
    
    
    const handleBookService = (event) => {
      event.preventDefault();
      const newOrderDetails = {
        vehicle: event.target.vehicle.value,
        vehicle_number: event.target.vehicle_number.value,
        date: event.target.date.value,
        customer_name: event.target.customer_name.value,
        customer_email: event.target.customer_email.value,
        phone_number: event.target.phone_number.value,
        license_number: event.target.license_number.value,
      };
      
      setOrderDetails(newOrderDetails);
      setShowModal(false);
      setShowPaymentPopup(true);
    };
    
    const handleMakePayment = async (e) => {
      e.preventDefault();
      const newService = {
        ...orderDetails,
        service_type: selectedService.name,
        pickup_location,
      };
      
      try {
        const response = await axios.post('http://localhost:8080/api/newservice', newService); // Ensure this URL is correct
        console.log('Booked Service:', response.data);
        setShowPaymentPopup(false);
        setPickupLocation('');
      } catch (error) {
        console.error('There was an error booking the service!', error);
      }
    };
    
    const handleLocationClick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setMapPosition({ lat: latitude, lng: longitude });
          setDraggableMarkerPosition({ lat: latitude, lng: longitude });
          fetchAddressFromCoordinates(latitude, longitude);
          setShowMap(true);
        }, () => {
          alert('Unable to retrieve your location');
        });
      } else {
        alert('Geolocation is not supported by this browser');
      }
    };
    
    const fetchAddressFromCoordinates = async (lat, lng) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        const address = data.display_name;
        setPickupLocation(address);
      } catch (error) {
        console.error('Error fetching address:', error);
        alert('Unable to fetch address');
      }
    };
    
    const handleMapDrag = (event) => {
      const { latlng } = event;
      if (latlng) {
        setDraggableMarkerPosition({ lat: latlng.lat, lng: latlng.lng });
        fetchAddressFromCoordinates(latlng.lat, latlng.lng);
      }
    };
    
    const handleMapClose = () => {
      setShowMap(false);
    };
    
    const handleLocationChange = (event) => {
      setPickupLocation(event.target.value);
      const [lat, lng] = event.target.value.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        setDraggableMarkerPosition({ lat, lng });
        setMapPosition({ lat, lng });
        fetchAddressFromCoordinates(lat, lng);
      }
    };
    
    const handleConfirmLocation = () => {
      if (draggableMarkerPosition.lat && draggableMarkerPosition.lng) {
        fetchAddressFromCoordinates(draggableMarkerPosition.lat, draggableMarkerPosition.lng);
      } else {
        alert('Marker position is not set');
      }
      handleMapClose();
    };
    
    const handleTabChange = (tab) => {
      setCurrentTab(tab);
      setSearchTerm('');
    };
    
    const filteredServices = services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      service.type === currentTab
    );
    
    return (
      <div style={{backgroundColor:'whitesmoke'}}>
      <Chatbot/>
        <PopupSection />
        <Navbar />

        <div className="services-page">
        
        <h1 style={{ marginTop: '50px' }}>Our Services</h1>
          <hr className="section-divider" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="tabs">
            <button 
              className={`tab-button ${currentTab === 'car' ? 'active' : ''}`} 
              onClick={() => handleTabChange('car')}
            > <FaCar size={24} /> Car Services
            </button>
            <button 
              className={`tab-button ${currentTab === 'bike' ? 'active' : ''}`} 
              onClick={() => handleTabChange('bike')}
            ><FaMotorcycle size={24} /> Bike Services
            </button>
          </div>
          <div className="services-list">
            {filteredServices.map(service => (
              <div key={service.id} className="service">
                <img src={service.image} alt={service.name} />
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <p className="service-price">{service.price}</p>
                <button className="book-button" onClick={() => handleBookServiceClick(service)}>Book</button>
              </div>
            ))}
          </div>
        </div>
        <Footer />

        {showModal && selectedService && (
          <div className="modal">
            <div className="modal-content animate">
              <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
              <h2 className="modal-title">Book a Service</h2>
              <hr className="section-divider" />
              <form onSubmit={handleBookService} className="service-form">
                <table className="service-table">
                  <tbody>
                    <tr>
                      <td><label><i className="fas fa-cogs"></i> Service Type required:</label></td>
                      <td><input type="text" value={selectedService.name} readOnly /></td>
                    </tr>
                    <tr>
                      <td><label><i className="fas fa-car"></i> Vehicle Brand and Model:</label></td>
                      <td><input type="text" name="vehicle" placeholder="Enter vehicle details" required /></td>
                    </tr>
                    <tr>
                      <td><label><i className="fas fa-id-card"></i> Vehicle Number:</label></td>
                      <td><input type="text" name="vehicle_number" placeholder="Enter vehicle number" required /></td>
                    </tr>
                    <tr>
                      <td><label><i className="fas fa-calendar-alt"></i> Date Of Service:</label></td>
                      <td><input type="date" name="date" required /></td>
                    </tr>
                    <tr>
                      <td><label><i className="fas fa-user"></i> Customer Name:</label></td>
                      <td><input type="text" name="customer_name" placeholder="Enter your name" required /></td>
                    </tr>
                    <tr>
                      <td><label><i className="fas fa-envelope"></i> Customer Email:</label></td>
                      <td><input type="email" name="customer_email" placeholder="Enter your email" required value={customerEmail} readOnly/></td>
                    </tr>
                    <tr>
                      <td><label><i className="fas fa-phone"></i> Phone Number:</label></td>
                      <td><input type="text" name="phone_number" placeholder="Enter your phone number" required /></td>
                    </tr>
                    <tr>
                      <td><label><i className="fas fa-id-badge"></i> License Number:</label></td>
                      <td><input type="text" name="license_number" placeholder="Enter license number" required /></td>
                    </tr>
                    <tr>
                      <td><label><i className="fas fa-map-marker-alt"></i> Pickup Location Address:</label></td>
                      <td className="location-field">
                        <input 
                          type="text" 
                          value={pickup_location} 
                          onChange={handleLocationChange} 
                          placeholder="Enter location or click 'Use Current Location'" 
                        />
                        <button type="button" onClick={handleLocationClick} className="location-button">
                          <i className="fas fa-location-arrow"></i> Use Current Location
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" className="book-service-button">Book Service</button>
              </form>
            </div>
          </div>
        )}
        
{showPaymentPopup && (
  <div className="modal-payment">
    <div className="modal-content">
      <span className="close-button-payment" onClick={() => setShowPaymentPopup(false)}>&times;</span>
      <h2 className="order-summary-title">Service Summary</h2>
      <hr className="section-divider" />
      <table className="order-summary">
        <tbody>
          <tr>
            <td><strong>Service Type:</strong></td>
            <td>{selectedService.name}</td>
          </tr>
          <tr>
            <td><strong>Vehicle:</strong></td>
            <td>{orderDetails.vehicle}</td>
          </tr>
          <tr>
            <td><strong>Vehicle Number:</strong></td>
            <td>{orderDetails.vehicle_number}</td>
          </tr>
          <tr>
            <td><strong>Date:</strong></td>
            <td>{orderDetails.date}</td>
          </tr>
          <tr>
            <td><strong>Customer Name:</strong></td>
            <td>{orderDetails.customer_name}</td>
          </tr>
          <tr>
            <td><strong>Customer Email:</strong></td>
            <td>{orderDetails.customer_email}</td>
          </tr>
          <tr>
            <td><strong>Phone Number:</strong></td>
            <td>{orderDetails.phone_number}</td>
          </tr>
          <tr>
            <td><strong>License Number:</strong></td>
            <td>{orderDetails.license_number}</td>
          </tr>
          <tr>
            <td><strong>Pickup Location:</strong></td>
            <td>{pickup_location}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="payment-section-title">Payment</h2>
      <hr className="section-divider" />
      <form onSubmit={handleMakePayment} className="payment-form">
        <div className="form-group-payment">
          <label style={{marginBottom:'20px'}}>Name</label>
          <input type="text" name="card_name" required className="animated-input" placeholder="Enter your Name" />
        </div>
        <div className="form-group-payment">
          <label>Payment Method</label>
          <div className="radio-group-payment">
            <label>
              <input
                type="radio"
                name="payment_method"
                value="Credit/Debit Card"
                required
                onChange={() => setPaymentMethod('Credit/Debit Card')}
              />
              <span>Credit/Debit Card</span>
              <i className="fas fa-credit-card"></i> 
            </label>
            <label>
              <input
                type="radio"
                name="payment_method"
                value="UPI"
                required
                onChange={() => setPaymentMethod('UPI')}
              />
              <span>UPI</span>
              <i className="fas fa-mobile-alt"></i>
            </label>
            <label>
              <input
                type="radio"
                name="payment_method"
                value="Cash on Service"
                required
                onChange={() => setPaymentMethod('Cash on Service')}
              />
              <span>Cash on Service</span>
              <i className="fas fa-money-bill-alt"></i>
            </label>
          </div>
        </div>
        {paymentMethod === 'Credit/Debit Card' && (
          <div>
            <div className="form-group-payment">
              <label>Card Number</label>
              <input type="text" name="card_number" required className="animated-input" placeholder="xxxx-xxxx-xxxx-xxxx" />
            </div>
            <div className="form-group-payment">
              <label>Expiry Date (MM/YY)</label>
              <input type="text" name="expiry_date" required className="animated-input" placeholder="MM/YY" />
            </div>
            <div className="form-group-payment">
              <label>CVV</label>
              <input type="text" name="cvv" required className="animated-input" placeholder="xxx" />
            </div>
          </div>
        )}
        {paymentMethod === 'UPI' && (
          <div className="form-group-payment">
            <label>UPI ID</label>
            <input type="text" name="upi_id" required className="animated-input" placeholder="example@upi" />
          </div>
        )}
        <button type="submit" className="make-payment-button">Make Payment</button>
      </form>
    </div>
  </div>
)}



        

        {showMap && (
          <div className="map-popup">
            <div className="map-popup-content">
              <span className="close-button" onClick={handleMapClose}>&times;</span>
              <MapContainer
                center={[mapPosition.lat, mapPosition.lng]}
                zoom={13}
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[draggableMarkerPosition.lat, draggableMarkerPosition.lng]}
                  icon={DefaultIcon}
                  draggable={true}
                  eventHandlers={{
                    dragend: (event) => {
                      const marker = event.target;
                      const position = marker.getLatLng();
                      handleMapDrag({ latlng: position });
                    },
                  }}
                >
                  <Popup>
                    Drag the marker to adjust the pickup location
                  </Popup>
                </Marker>
              </MapContainer>
              <button className="confirm-location-button" onClick={handleConfirmLocation}>Confirm Location</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Services;

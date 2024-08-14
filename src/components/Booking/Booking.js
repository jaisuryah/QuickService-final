import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Booking.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FaEdit, FaSave } from "react-icons/fa";
import Chatbot from '../ChatBot/Chatbot';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const email = sessionStorage.getItem('userEmail'); 
        if (!email) {
          setError('No user logged in.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/bookings/${email}`);
        console.log('Bookings fetched:', response.data);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings.');
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/bookings/${id}`);
      console.log('Booking deleted:', response.data);
      setBookings(bookings.filter(booking => booking.id !== id));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError('Failed to cancel booking.');
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
  };

  const handleUpdateBooking = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/bookings/${id}`, editingBooking);
      console.log('Booking updated:', response.data);
      setBookings(bookings.map(booking => booking.id === id ? response.data : booking));
      setEditingBooking(null);
    } catch (error) {
      console.error('Error updating booking:', error);
      setError('Failed to update booking.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingBooking({ ...editingBooking, [name]: value });
  };

  const openConfirmModal = (id) => {
    setBookingToDelete(id);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setBookingToDelete(null);
  };

  return (
    <div>
    <Chatbot/>
      <Navbar/>
      <div className="bookings-container">
        <h2>Your Bookings</h2>
        <hr className="section-divider" />
        {error && <p>{error}</p>}
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>Service: {booking.service_type}</h3>
              <p>Email: {booking.customer_email}</p>
              <p>Booking Date: {booking.date}</p>
              <p>PickUp Address: {booking.pickup_location}</p>
              <p>Vehicle Brand: {booking.vehicle}</p>
              <p>Vehicle Number: {booking.vehicle_number}</p>
              <p
                style={{
                  color: booking.status === 0 ? 'red' : booking.status === 1 ? 'green' : 'blue',
                }}
              >
                Status: {booking.status === 0 ? 'Pending' : booking.status === 1 ? 'Finished' : 'In Progress'}
              </p>
              {booking.status !== 1 && (
                <button onClick={() => openConfirmModal(booking.id)}>Cancel</button>
              )}
              {booking.status !== 1 && (
                <button onClick={() => handleEditBooking(booking)} style={{ marginTop: '10px' }}>
                  <FaEdit /> Edit
                </button>
              )}
            </div>
          ))}
        </div>
        {editingBooking && (
          <div className="edit-booking-modal">
            <h3>Edit Booking</h3>
            <table>
              <tbody>
                <tr>
                  <td><label>Service Type:</label></td>
                  <td>
                    <input
                      type="text"
                      name="service_type"
                      value={editingBooking.service_type}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Booking Date:</label></td>
                  <td>
                    <input
                      type="text"
                      name="date"
                      value={editingBooking.date}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>PickUp Address:</label></td>
                  <td>
                    <input
                      type="text"
                      name="pickup_location"
                      value={editingBooking.pickup_location}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Vehicle Brand:</label></td>
                  <td>
                    <input
                      type="text"
                      name="vehicle"
                      value={editingBooking.vehicle}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Vehicle Number:</label></td>
                  <td>
                    <input
                      type="text"
                      name="vehicle_number"
                      value={editingBooking.vehicle_number}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="modal-buttons">
              <button onClick={() => handleUpdateBooking(editingBooking.id)}><FaSave /> Save</button>
              <button onClick={() => setEditingBooking(null)} style={{ marginTop: '10px' }}>Cancel</button>
            </div>
          </div>
        )}
        {showConfirmModal && (
          <div className="confirm-modal">
            <div className="confirm-modal-content">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to cancel this booking?</p>
              <div className="modal-buttons">
                <button onClick={() => handleCancelBooking(bookingToDelete)}>Yes</button>
                <button onClick={closeConfirmModal}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Bookings;

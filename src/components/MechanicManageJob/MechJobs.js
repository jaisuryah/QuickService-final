import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MechJobs.css';
import MechanicSidePanel from '../MechanicNav/MechSide';

const ManageJobs = () => {
    const [mechanic, setMechanic] = useState({});
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
                   const fetchMechanic = async () => {
               const email = sessionStorage.getItem('userEmail');
               if (!email) {
                   setError('No user logged in.');
                   setLoading(false);
                   return;
               }

               try {
                   const response = await axios.get(`http://localhost:8080/api/mechanics/email/${email}`);
                   console.log('Mechanic fetched:', response.data);
                   setMechanic(response.data);
               } catch (err) {
                   setError('Failed to fetch mechanic.');
               } finally {
                   setLoading(false);
               }
           };

           fetchMechanic();
       }, []);

       useEffect(() => {
           const fetchBookings = async () => {
               if (!mechanic.id) {
                   console.log('Mechanic ID not available yet.');
                   return;
               }

               try {
                   const response = await axios.get(`http://localhost:8080/api/bookings/mechanic/${mechanic.id}`);
                   console.log('Bookings fetched:', response.data);
                   setBookings(response.data);
               } catch (err) {
                   setError('Failed to fetch bookings.');
               }
           };

           fetchBookings();
       }, [mechanic.id]);

       const handleStatusUpdate = async (bookingId) => {
           try {
               await axios.put(`http://localhost:8080/api/bookings/status/${bookingId}`);
               // Optionally, refresh bookings after updating status
               const response = await axios.get(`http://localhost:8080/api/bookings/mechanic/${mechanic.id}`);
               setBookings(response.data);
           } catch (err) {
               setError('Failed to update booking status.');
           }
       };

       if (loading) {
           return <p>Loading mechanic information...</p>;
       }

       return (
           <div className="manage-jobs-container">
               <MechanicSidePanel />
               <h2>Assigned Work for Mechanic ID: {mechanic.id || 'Not available'}</h2>
               {error && <p>{error}</p>}

               {bookings.length > 0 ? (
                   <table className="bookings-table">
                       <thead>
                           <tr>
                               <th>Booking ID</th>
                               <th>Vehicle</th>
                               <th>Service Type</th>
                               <th>Date</th>
                               <th>Customer Name</th>
                               <th>Status</th>
                               <th>Update Status</th>
                           </tr>
                       </thead>
                       <tbody>
                           {bookings.map((booking) => (
                               <tr key={booking.id}>
                                   <td>{booking.id}</td>
                                   <td>{booking.vehicle}</td>
                                   <td>{booking.service_type}</td>
                                   <td>{booking.date}</td>
                                   <td>{booking.customer_name}</td>
                                   <td>
                                       <p
                                           style={{
                                               color: booking.status === 0 ? 'red' : booking.status === 1 ? 'green' : 'black',
                                           }}
                                       >
                                           {booking.status === 0 ? 'Pending' : booking.status === 1 ? 'Finished' : 'Unknown'}
                                       </p>
                                   </td>
                                   <td>
                                       <button onClick={() => handleStatusUpdate(booking.id)} disabled={booking.status === 1}>
                                           {booking.status === 1 ? 'Finished' : 'Mark as Finished'}
                                       </button>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               ) : (
                   <p>No bookings found.</p>
               )}
           </div>
       );
   };

   export default ManageJobs;

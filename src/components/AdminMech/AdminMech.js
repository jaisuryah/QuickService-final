import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './AdminMech.css';
import AdminSidePanel from '../AdminNav/AdminNav';

const ManageMechanics = () => {
    const [mechanics, setMechanics] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [availableMechanics, setAvailableMechanics] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/mechanics')
            .then(response => setMechanics(response.data))
            .catch(error => console.error('Error fetching mechanics:', error));
        
        axios.get('http://localhost:8080/api/allbookings')
            .then(response => setBookings(response.data))
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    const deleteMechanic = (id) => {
        axios.delete(`http://localhost:8080/api/mechanics/${id}`)
            .then(() => setMechanics(mechanics.filter(mechanic => mechanic.id !== id)))
            .catch(error => console.error('Error deleting mechanic:', error));
    };

    const openPopup = (booking) => {
        setSelectedBooking(booking);
        axios.get('http://localhost:8080/api/mechanics')
            .then(response => {
                const available = response.data.filter(mechanic => mechanic.available === 0);
                setAvailableMechanics(available);
                setShowPopup(true);
            })
            .catch(error => console.error('Error fetching mechanics:', error));
    };

    const assignMechanic = (mechanicId) => {
        if (selectedBooking) {
            const mechanic = availableMechanics.find(mech => mech.id === mechanicId);

            axios.put(`http://localhost:8080/api/bookings/${selectedBooking.id}`, {
                ...selectedBooking,
                mechanic_id: mechanicId,
                mechanic_name: mechanic.username,
                status: 2
            })
            .then(() => {
                return axios.put(`http://localhost:8080/api/mechanics/${mechanicId}`, { available: 1 });
            })
            .then(() => {
                setShowPopup(false);
                setAvailableMechanics(availableMechanics.filter(mechanic => mechanic.id !== mechanicId));
                setBookings(bookings.map(booking =>
                    booking.id === selectedBooking.id
                        ? { ...booking, mechanic_id: mechanicId, mechanic_name: mechanic.username }
                        : booking
                ));
            })
            .catch(error => console.error('Error assigning mechanic:', error));
        }
    };

    return (
        <div className='manage-bookings-container-admin'>
            <AdminSidePanel />
         <center> <h2 className="page-title">Manage Mechanics</h2></center>
            <table className="bookings-table-admin">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mechanics.map(mechanic => (
                        <tr key={mechanic.id}>
                            <td>{mechanic.id}</td>
                            <td>{mechanic.username}</td>
                            <td>{mechanic.email}</td>
                            <td>{mechanic.dateOfBirth}</td>
                            <td>
                                <p
                                    style={{
                                        color: mechanic.available === 0 ? 'green' : mechanic.available === 1 ? 'red' : 'black',
                                    }}
                                >
                                    {mechanic.available === 0 ? 'Available' : mechanic.available === 1 ? 'Assigned' : 'Unknown'}
                                </p>
                            </td>
                            <td>
                                <button 
                                    className="delete-button" 
                                    onClick={() => deleteMechanic(mechanic.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

          <center><h2 className="page-title">All Bookings</h2></center>
            <table className="bookings-table-admin">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vehicle</th>
                        <th>Service Type</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.vehicle}</td>
                            <td>{booking.service_type}</td>
                            <td>{booking.date}</td>
                            <td>{booking.customer_name}</td>
                            <td>{booking.phone_number}</td>
                            <td>
                                <p
                                    style={{
                                        color: booking.status === 0 ? 'red' : booking.status === 1 ? 'green' : 'blue',
                                    }}
                                >
                                    {booking.status === 0 ? 'Pending' : booking.status === 1 ? 'Finished' : 'In Progress'}
                                </p>
                            </td>
                            <td>
                                <button 
                                    className="assign-button"
                                    onClick={() => openPopup(booking)}
                                    disabled={booking.mechanic_id}
                                >
                                    {booking.mechanic_id ? 'Assigned' : <><FontAwesomeIcon icon={faEdit} /> Assign</>}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup-assign">
                    <h3>Available Mechanics</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {availableMechanics.map(mechanic => (
                                <tr key={mechanic.id}>
                                    <td>{mechanic.id}</td>
                                    <td>{mechanic.username}</td>
                                    <td>
                                        <button onClick={() => assignMechanic(mechanic.id)}>Assign</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default ManageMechanics;

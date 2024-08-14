import React, { useState, useEffect } from 'react';
import './AdminBook.css';
import AdminSidePanel from '../AdminNav/AdminNav';
import Modal from 'react-modal';
import axios from 'axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);

  useEffect(() => {

    axios.get('http://localhost:8080/api/allbookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    const sortedBookings = [...bookings].sort((a, b) => {
      if (a[field] === undefined || b[field] === undefined) return 0; // Avoid errors with undefined
      if (order === 'asc') {
        return a[field].toString().localeCompare(b[field].toString());
      } else {
        return b[field].toString().localeCompare(a[field].toString());
      }
    });
    setBookings(sortedBookings);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const removeBooking = (id) => {
    axios.delete(`http://localhost:8080/api/bookings/${id}`)
      .then(() => {
        setBookings(bookings.filter(booking => booking.id !== id));
        closeDeleteModal();
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };


  const filteredBookings = bookings.filter(booking => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (booking.customer_name && booking.customer_name.toLowerCase().includes(searchLower)) ||
      (booking.customer_email && booking.customer_email.toLowerCase().includes(searchLower)) ||
      (booking.service_type && booking.service_type.toLowerCase().includes(searchLower)) ||
      (booking.date && booking.date.includes(searchTerm)) ||
      (booking.vehicle && booking.vehicle.toLowerCase().includes(searchLower)) ||
      (booking.vehicle_number && booking.vehicle_number.toLowerCase().includes(searchLower)) ||
      (booking.pickup_location && booking.pickup_location.toLowerCase().includes(searchLower))
    );
  });

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const openDeleteModal = (id) => {
    setDeleteBookingId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteBookingId(null);
  };

  return (
    <div className="manage-bookings-container-admin">
      <AdminSidePanel />
      <div className="bookings-table-container-admin">
        <center><h2 style={{marginBottom:"18px"}}>Manage Bookings</h2>
        <input
          type="text"
          placeholder="Search Bookings"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        /></center>
        <table className="bookings-table-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th onClick={() => handleSort('customer_name')}>Customer Name</th>
              <th onClick={() => handleSort('customer_email')}>Customer Email</th>
              <th onClick={() => handleSort('service_type')}>Service</th>
              <th onClick={() => handleSort('date')}>Date</th>
              <th onClick={() => handleSort('vehicle')}>Vehicle</th>
              <th onClick={() => handleSort('vehicle_number')}>Vehicle Number</th>
              <th onClick={() => handleSort('status')}>Status</th>
              <th>PickUp Address</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map(booking => (
              <tr key={booking.id}>
                <td data-label="ID">{booking.id}</td>
                <td data-label="Customer Name">{booking.customer_name}</td>
                <td data-label="Customer Email">{booking.customer_email}</td>
                <td data-label="Service">{booking.service_type}</td>
                <td data-label="Date">{booking.date}</td>
                <td data-label="Vehicle">{booking.vehicle}</td>
                <td data-label="Vehicle Number">{booking.vehicle_number}</td>
                <td> <p
                style={{
                  color: booking.status === 0 ? 'red' : booking.status === 1 ? 'green' : 'blue',
                }}
              >
              {booking.status === 0 ? 'Pending' : booking.status === 1 ? 'Finished' : 'In Progress'}
              </p></td>
                <td data-label="PickUp Address">{booking.pickup_location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} contentLabel="Confirm Delete">
        <div className='delete-modal'>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this booking?</p>
          <button onClick={() => removeBooking(deleteBookingId)} className='btn-confirm'>Yes</button>
          <button onClick={closeDeleteModal} className='btn-cancel'>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageBookings;

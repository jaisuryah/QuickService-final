import React, { useState, useEffect } from 'react';
import './AdminCus.css';
import AdminSidePanel from '../AdminNav/AdminNav';
import axios from 'axios';
import { MdOutlineCancel } from "react-icons/md";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${customerToDelete.id}`);
      setCustomers(customers.filter(customer => customer.id !== customerToDelete.id));
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredCustomers = customers.filter(customer =>
    (customer.username && customer.username.toLowerCase().includes(searchTerm)) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm)) ||
    (customer.phone && customer.phone.includes(searchTerm)) ||
    (customer.address && customer.address.toLowerCase().includes(searchTerm)) ||
    (customer.role && customer.role.toLowerCase().includes(searchTerm))
  );

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="manage-bookings-container-admin">
      <AdminSidePanel />
      <div className="bookings-table-container-admin">
        <center><h2 className="customers-title">Manage Customers</h2><input
        type="text"
        placeholder="Search Customers"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      /></center>
        
        <table className="bookings-table-admin">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">DOB</th>
              <th className="table-header">State</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>{customer.date_of_birth}</td>
                <td>{customer.state}</td>
                <td>
                  <button onClick={() => handleDelete(customer)} className="action-btn delete-btn">Delete <MdOutlineCancel />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          {Array.from({ length: Math.ceil(filteredCustomers.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Confirm Delete</h3>
              <p>Are you sure you want to delete this customer?</p>
              <button onClick={confirmDelete} className="modal-btn confirm-btn">Yes</button>
              <button onClick={() => setShowDeleteModal(false)} className="modal-btn cancel-btn">No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCustomers;

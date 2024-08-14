import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminServices.css';
import AdminSidePanel from '../AdminNav/AdminNav';
import { FaCar, FaMotorcycle } from 'react-icons/fa';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

const ManageServices = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('car');
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/all');
        setServices(response.data);
      } catch (error) {
        console.error('There was an error fetching the services!', error);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      name: serviceName,
      description,
      price,
      image,
      type,
    };

    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:8080/api/services/${editServiceId}`, newService);
        setServices(services.map(service => service.id === editServiceId ? response.data : service));
        setIsEditing(false);
        setEditServiceId(null);
      } else {
        const response = await axios.post('http://localhost:8080/api/add', newService);
        setServices([...services, response.data]);
      }
      setServiceName('');
      setDescription('');
      setPrice('');
      setImage('');
      setType('');
    } catch (error) {
      console.error('Error adding/editing service:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/services/${id}`);
      setServices(services.filter(service => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (service) => {
    setServiceName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setImage(service.image);
    setType(service.type);
    setIsEditing(true);
    setEditServiceId(service.id);
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
    <div className="manage-services-container">
      <AdminSidePanel />
      <div className="form-container">
        <center>
          <h2>{isEditing ? 'Edit Service' : 'Add Service'}</h2>
          <form onSubmit={handleSubmit}>
            <table className="service-form-table">
              <tbody>
                <tr>
                  <td><label htmlFor="serviceName">Service Name</label></td>
                  <td><input
                    type="text"
                    id="serviceName"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="description">Description</label></td>
                  <td><textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="price">Price</label></td>
                  <td><input
                    type="text"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="image">Image URL</label></td>
                  <td><input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="type">Type</label></td>
                  <td><input
                    type="text"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  /></td>
                </tr>
                <tr>
                  <td colSpan="2"><button type="submit" className="btn-submit">{isEditing ? 'Update Service' : 'Add Service'} <IoIosAddCircleOutline /></button></td>
                </tr>
              </tbody>
            </table>
          </form>
        </center>

        <div className="services-page">
          <h1 style={{ marginTop: '50px' }}>Our Services</h1>
          <input
            type="text"
            className="search-input"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: '30px' }}
          />
          <div className="tabs">
            <button 
              className={`tab-button ${currentTab === 'car' ? 'active' : ''}`} 
              onClick={() => handleTabChange('car')}
            >
              <FaCar size={24} /> Car Services
            </button>
            <button 
              className={`tab-button ${currentTab === 'bike' ? 'active' : ''}`} 
              onClick={() => handleTabChange('bike')}
            >
              <FaMotorcycle size={24} /> Bike Services
            </button>
          </div>
          <div className="services-list">
            {filteredServices.map(service => (
              <div key={service.id} className="service">
                <img src={service.image} alt={service.name} />
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <p className="service-price">{service.price}</p>
                <button onClick={() => handleEdit(service)} className="btn-edit" style={{marginTop:'10px'}}>Edit <FaEdit/></button>
                <button onClick={() => handleDelete(service.id)} className="btn-delete">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;

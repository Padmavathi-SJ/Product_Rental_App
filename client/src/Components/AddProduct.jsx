import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    date: '',
    location: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate all fields are filled
    if (!formData.item_name || !formData.date || !formData.location) {
      setError('All fields are required');
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setError('Admin not authenticated');
        navigate('/admin/login');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.post(
        'http://localhost:5000/api/products/add',
        formData,
        config
      );

      setMessage('Product added successfully!');
      setFormData({
        item_name: '',
        date: '',
        location: ''
      });

      // Optionally redirect after success
      // navigate('/admin/products');

    } catch (err) {
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 401 || err.response.status === 403) {
          setError('Session expired. Please login again.');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminInfo');
          navigate('/admin/login');
        } else {
          setError(err.response.data.msg || 'Failed to add product');
        }
      } else if (err.request) {
        // Request was made but no response
        setError('Network error. Please try again.');
      } else {
        // Other errors
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item_name">Product Name:</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
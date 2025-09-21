import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
//import AdminHome from './AdminHome';
import ProductsList from './ProductList';
import AddProduct from './AddProduct';
import AdminLogin from './AdminLogin';
import AdminSignUp from './AdminSignUp';
import EditProduct from './EditProduct;
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('adminToken')
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    setIsLoggedIn(false);
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      {isLoggedIn && (
        <nav className="admin-nav">
          <h2>Admin Panel</h2>
          <div className="nav-links">
            <button onClick={() => navigate('/admin/home')}>Dashboard</button>
            <button onClick={() => navigate('/admin/products')}>Products</button>
            <button onClick={() => navigate('/admin/add-product')}>Add Product</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </nav>
      )}

      <div className="admin-content">
        <Routes>
          <Route path="/login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<AdminSignUp setIsLoggedIn={setIsLoggedIn} />} />
         
          <Route path="/products" element={<ProductsList />} />
          <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

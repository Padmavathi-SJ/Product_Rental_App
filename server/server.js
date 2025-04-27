import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ownerRoutes from './Routes/OwnerRoutes.js'; // Import the owner routes
import './Config/db.js'; // Connect to the database
import productRoutes from './Routes/productRoutes.js';

dotenv.config(); // Load environment variables

const app = express();

app.use(cors()); // Enable cross-origin resource sharing
app.use(express.json()); // Parse JSON data from incoming requests

// Use the routes
app.use('/api/admin', ownerRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('Backend listening at http://localhost:5000');
});

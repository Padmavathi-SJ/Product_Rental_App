import express from 'express';
import { 
  addProduct, 
  getProducts, 
  getProduct, 
  editProduct, 
  removeProduct 
} from '../Controllers/owner/productController.js';
import { protect } from '../Middlewares/auth.js';

const router = express.Router();

// Protected routes
router.post('/add', protect, addProduct);
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.put('/:id', protect, editProduct);
router.delete('/:id', protect, removeProduct);

export default router;
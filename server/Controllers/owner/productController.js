import { 
    insertProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
  } from '../../Models/owner/product.js';
  
  // Existing addProduct function
  export const addProduct = async (req, res) => {
    try {
      const { item_name, date, location } = req.body;
      if (!item_name || !date || !location) {
        return res.status(400).json({ msg: 'All fields are required' });
      }
  
      const result = await insertProduct(item_name, date, location);
      res.status(201).json({
        msg: 'Product added successfully',
        product: {
          id: result.insertId,
          item_name,
          date,
          location,
        },
      });
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error });
    }
  };
  
  // Get all products
  export const getProducts = async (req, res) => {
    try {
      const products = await getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error });
    }
  };
  
  // Get single product
  export const getProduct = async (req, res) => {
    try {
      const product = await getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error });
    }
  };
  
  // Update product
  export const editProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { item_name, date, location } = req.body;
      
      if (!item_name || !date || !location) {
        return res.status(400).json({ msg: 'All fields are required' });
      }
  
      await updateProduct(id, item_name, date, location);
      res.status(200).json({
        msg: 'Product updated successfully',
        product: {
          id,
          item_name,
          date,
          location,
        },
      });
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error });
    }
  };
  
  // Delete product
  export const removeProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await getProductById(id);
      
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
  
      await deleteProduct(id);
      res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error });
    }
  };
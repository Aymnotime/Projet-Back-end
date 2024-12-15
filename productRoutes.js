import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
router.post('/', authenticateToken, createProduct); 
router.get('/', getProducts); 
router.put('/:id', authenticateToken, updateProduct); 
router.delete('/:id', authenticateToken, deleteProduct); 

export default router;
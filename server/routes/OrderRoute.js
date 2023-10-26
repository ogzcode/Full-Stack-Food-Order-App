import express from 'express';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { createOrder, getOrders, deleteAllOrders } from '../controller/OrderController.js';

const router = express.Router();

router.post('/createOrder', authMiddleware, createOrder);
router.get('/getOrders', authMiddleware, getOrders);
router.delete('/deleteAllOrders', authMiddleware, deleteAllOrders);

export default router;
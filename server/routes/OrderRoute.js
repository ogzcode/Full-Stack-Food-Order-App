import express from 'express';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { createOrder, getOrders } from '../controller/OrderController.js';

const router = express.Router();

router.post('/createOrder', authMiddleware, createOrder);
router.get('/getOrders', authMiddleware, getOrders);

export default router;
import express from 'express';

import { authMiddleware } from '../middleware/authMiddleware.js';
import {
    createOrder,
    getOrders,
    deleteAllOrders,
    getOrderDetails,
    changeOrderStatus,
    getAllOrders,
    getPendingDataCount,
    getUserPendingOrder
} from '../controller/OrderController.js';

const router = express.Router();

router.post('/createOrder', authMiddleware, createOrder);
router.get('/getOrders', authMiddleware, getOrders);
router.delete('/deleteAllOrders', authMiddleware, deleteAllOrders);
router.get('/getOrderDetails/:orderId', authMiddleware, getOrderDetails);
router.put('/changeOrderStatus', authMiddleware, changeOrderStatus);
router.get('/getAllOrders', authMiddleware, getAllOrders);
router.get('/getPendingDataCount', authMiddleware, getPendingDataCount);
router.get('/getUserPendingOrder', authMiddleware, getUserPendingOrder);

export default router;
import express from 'express';

import { deleteAllUsers, getAllUsers, deleteUserById, deleteAccount, updateUser } from '../controller/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.delete('/deleteAll', deleteAllUsers);
router.get('/getAllUsers', authMiddleware, getAllUsers);
router.delete('/deleteUser/:id', authMiddleware, deleteUserById);
router.delete('/deleteAccount/:password', authMiddleware, deleteAccount);
router.patch('/updateUser', authMiddleware, updateUser);

export default router;
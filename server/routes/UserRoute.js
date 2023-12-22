import express from 'express';

import {
    deleteAllUsers,
    getAllUsers,
    deleteUserById,
    deleteAccount,
    updateUser,
    changePassword,
    getUserDetails,
} from '../controller/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.delete('/deleteAll', deleteAllUsers);
router.get('/getAllUsers', authMiddleware, getAllUsers);
router.get('/getUserDetails', authMiddleware, getUserDetails);
router.delete('/deleteUser/:id', authMiddleware, deleteUserById);
router.delete('/deleteAccount/:password', authMiddleware, deleteAccount);
router.patch('/updateUser', authMiddleware, updateUser);
router.patch('/updatePassword', authMiddleware, changePassword);

export default router;
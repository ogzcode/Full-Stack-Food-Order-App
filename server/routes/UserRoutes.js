import express from 'express';
import { tokenControl } from '../middlewares/authMiddleware.js';
import { verifyUser, getAllUsers } from '../controllers/UserController.js';

const router = express.Router();

router.get('/verifyUser', tokenControl, verifyUser);
router.get('/getAllUsers', tokenControl, getAllUsers);

export default router;



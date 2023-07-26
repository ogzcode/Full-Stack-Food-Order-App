import express from 'express';
import { tokenControl } from '../middlewares/authMiddleware.js';
import { verifyUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/verifyUser', tokenControl, verifyUser);

export default router;



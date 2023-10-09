import express from 'express';

import { deleteAllUsers } from '../controller/UserController.js';

const router = express.Router();

router.delete('/deleteAll', deleteAllUsers);

export default router;
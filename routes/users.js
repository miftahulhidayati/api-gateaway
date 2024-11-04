import express from 'express';
const router = express.Router();

import usersHandler from './handler/users/index.js';
import verifyToken from '../middlewares/verifyToken.js';

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.put('/', verifyToken, usersHandler.update);
router.get('/', verifyToken, usersHandler.getUser);
router.post('/logout', verifyToken, usersHandler.logout);

export default router;

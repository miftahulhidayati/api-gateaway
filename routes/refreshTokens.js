import express from 'express';
const router = express.Router();

import refreshTokenHandler from './handler/refresh-tokens/index.js';

router.post('/', refreshTokenHandler.refreshToken);
export default router;

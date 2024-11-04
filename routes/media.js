import express from 'express';
const router = express.Router();

import mediaHandler from './handler/media/index.js';

router.post('/', mediaHandler.create);
router.get('/', mediaHandler.getAll);
router.delete('/:id', mediaHandler.destroy);

export default router;

import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import * as commentController from './comment.controller.js';

const router = Router();

router.put('/:id', requireAuth, commentController.update);
router.delete('/:id', requireAuth, commentController.remove);

export default router;
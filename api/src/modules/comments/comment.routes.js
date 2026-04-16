import { Router } from 'express';
import * as commentController from './comment.controller.js';

const router = Router();

router.put('/:id', commentController.update);
router.delete('/:id', commentController.remove);

export default router;
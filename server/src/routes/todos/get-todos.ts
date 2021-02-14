import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middleware/require-auth';
import { Todo } from '../../models/todo';

const router = Router();

router.get(
  '/api/todos',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const todos = await Todo.find({ userId: req.currentUser!.id });

    res.send(todos);
  }
);

export { router as getTodosRouter };

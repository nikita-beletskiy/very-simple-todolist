import { Router, Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { NotFoundError } from '../../errors/not-found-error';
import { requireAuth } from '../../middleware/require-auth';
import { Todo } from '../../models/todo';

const router = Router();

router.delete(
  '/api/todos/:id',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const todo = await Todo.findById(req.params.id);

    const deleteTodoAndRespond = async () => {
      await Todo.findByIdAndDelete(req.params.id);
      const todos = await Todo.find({ userId: req.currentUser!.id });
      res.send(todos);
    };

    !todo
      ? next(new NotFoundError())
      : todo.userId !== req.currentUser!.id
      ? next(new NotAuthorizedError())
      : await deleteTodoAndRespond();
  }
);

export { router as deleteTodoRouter };

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

    const deleteTodoAndRespond = async (id: string) => {
      await Todo.deleteOne({ _id: id });
      res.send({ deletedId: id });
    };

    !todo
      ? next(new NotFoundError())
      : todo.userId !== req.currentUser!.id
      ? next(new NotAuthorizedError())
      : await deleteTodoAndRespond(todo.id);
  }
);

export { router as deleteTodoRouter };

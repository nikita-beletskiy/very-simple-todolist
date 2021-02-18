import { Router, Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { NotFoundError } from '../../errors/not-found-error';
import { requireAuth } from '../../middleware/require-auth';
import { Todo, TodoDoc } from '../../models/todo';

const router = Router();

router.patch(
  '/api/todos/:id',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const todo = await Todo.findById(req.params.id);

    const updateTodoAndRespond = async (todoToUpdate: TodoDoc) => {
      todoToUpdate.set({ done: !todoToUpdate.done });
      await todoToUpdate.save();

      res.send({ checkedId: todoToUpdate.id });
    };

    !todo
      ? next(new NotFoundError())
      : todo.userId !== req.currentUser!.id
      ? next(new NotAuthorizedError())
      : await updateTodoAndRespond(todo);
  }
);

export { router as updateTodoRouter };

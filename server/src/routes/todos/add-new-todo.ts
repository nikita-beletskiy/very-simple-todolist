import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../../middleware/require-auth';
import { validateRequest } from '../../middleware/validate-request';
import { Todo } from '../../models/todo';

const router = Router();

router.post(
  '/api/todos',
  requireAuth, // Custom middleware that will inspect 'req' object after getCurrentUser middleware ran (it's inside index, just before all route handlers). If there is no 'currentUser' property on this object this middleware throws NotAuthorizedError
  [body('title').not().isEmpty().trim().withMessage('Invalid todo')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;

    const newTodo = Todo.build({ title, userId: req.currentUser!.id });
    await newTodo.save();

    res.send(newTodo);
  }
);

export { router as addNewTodoRouter };

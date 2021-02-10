import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';

const router = express.Router();
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Invalid password')
  ],
  validateRequest, // Custom middleware that will inspect 'req' object after 'body' function checked it for incorrect data and possibly set some errors on it
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    res.send({ email, password });
  }
);

export { router as signupRouter };

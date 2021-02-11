import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../middleware/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

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
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new BadRequestError('Email in use'));

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };

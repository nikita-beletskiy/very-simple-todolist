import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
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

    // Generate JWT - payload as a first argument and a signing key as the second
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    // Store JWT on req.session object that is created by cookie-session library. This object's data will be stored inside a cookie
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

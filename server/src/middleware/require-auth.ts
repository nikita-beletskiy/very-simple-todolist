import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  !req.currentUser
    ? next(new NotAuthorizedError())
    : !(await User.findById(req.currentUser.id))
    ? next(new NotAuthorizedError())
    : next();
};

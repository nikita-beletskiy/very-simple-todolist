import express from 'express';
import { getCurrentUser } from '../middleware/get-current-user';

const router = express.Router();

// getCurrentUser middleware augments Express.Request object so that it has a currentUser property. Then it checks whether or not there is a cookie set on that object. If there is some cookie, middleware tries to verify it. If there is no cookie or if verification fails req.currentUser remains undefined. If verification is successful its result gets assigned to req.currentUser. So response will always actual current user data or null if req.currentUser is undefined.
router.get('/api/users/currentuser', getCurrentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

import { Router } from 'express';
import { User } from '../../models/user';

const router = Router();

// getCurrentUser middleware augments Express.Request object so that it has a currentUser property. Then it checks whether or not there is a cookie set on that object. If there is some cookie, middleware tries to verify it. If there is no cookie or if verification fails req.currentUser remains undefined. If verification is successful its result gets assigned to req.currentUser. So response will always actual current user data or null if req.currentUser is undefined.
router.get('/api/users/currentuser', async (req, res) => {
  res.send({
    // If there is some cookie set on a client, but there is no corresponding user in DB (e.g. after DB restart) currentUser will be null
    currentUser: (await User.findById(req.currentUser?.id)) || null
  });
});

export { router as currentUserRouter };

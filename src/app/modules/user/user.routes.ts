
import { Router } from 'express';
import { UserControllers } from './user.controller';
const router = Router();

router.get('/me', UserControllers.getProfile);

router.put(
  '/me',
   UserControllers.updateUserProfile,
);

export const UserRoutes = router;

import { Router } from 'express';
import { UserControllers } from './user.controller';
const router = Router();

router.get('/me', UserControllers.getProfile);

export const UserRoutes = router;
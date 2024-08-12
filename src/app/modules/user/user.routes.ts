
import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from './user.validations';
const router = Router();

router.get('/me', UserControllers.getProfile);

router.put(
  '/me',
  validateRequest(UserValidations.updateUserProfileValidationSchema),
   UserControllers.updateUserProfile,
);

export const UserRoutes = router;
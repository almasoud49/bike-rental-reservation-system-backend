import { AuthValidation } from './auth.validations';
import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validations';

const router = Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
    AuthControllers.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginUserValidationSchema),
    AuthControllers.loginUser
);

router.post(
  '/generate-access-token',
  AuthControllers.generateAccessToken,
);

export const AuthRoutes = router;
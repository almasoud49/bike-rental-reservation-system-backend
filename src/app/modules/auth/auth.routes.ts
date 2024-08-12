import { Router } from 'express';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/signup',
    AuthControllers.createUser,
);

router.post(
  '/login',
    AuthControllers.loginUser,
);

router.post(
  '/generate-access-token',
  AuthControllers.generateAccessToken,
);

export const AuthRoutes = router;
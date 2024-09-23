import { AuthValidation } from './auth.validations'
import { Router } from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { auth } from '../../middleware/auth'

const authRouter = Router()
const userRouter = Router()

authRouter.post(
  '/signup',
  validateRequest(AuthValidation.createUserValidationSchema),
  AuthControllers.createUser,
)

authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthControllers.loginUser,
)

authRouter.post('/generate-access-token', AuthControllers.generateAccessToken)

userRouter.get('/me', AuthControllers.getProfile)

userRouter.put(
  '/me',
  validateRequest(AuthValidation.updateUserProfileValidationSchema),
  AuthControllers.updateUserProfile,
)

userRouter.get('/', auth(['admin']), AuthControllers.getAllUsers)

userRouter.delete('/:id', auth(['admin']), AuthControllers.deleteUser)

userRouter.put('/:id', auth(['admin']), AuthControllers.updateUserRole)

export const AuthRoutes = { authRouter, userRouter }

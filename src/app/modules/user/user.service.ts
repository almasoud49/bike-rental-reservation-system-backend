import httpStatus from 'http-status'
import config from '../../config'
import { AppError } from '../../errors/AppError'
import { UserModel } from './user.model'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TUpdateUser } from './user.interface'

// get user profile with access token
const getProfile = async (token: string) => {
  const { email, role } = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload

  const user = await UserModel.findOne({ email, role })
  return user
}

// update user profile
const updateUserProfile = async (payload: TUpdateUser, token: string) => {
  const rawToken = token.split(' ')[1]

  const { email, role } = jwt.verify(
    rawToken,
    config.jwt_access_secret as string,
  ) as JwtPayload

  // check  user existence with the email
  const isUserExist = await UserModel.findOne({ email, role })

  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!')
  }

  const result = await UserModel.findOneAndUpdate({ email, role }, payload, {
    new: true,
  }).select('-createdAt -updatedAt -__v')
  return result
}

export const UserServices = {
  getProfile,
  updateUserProfile,
}

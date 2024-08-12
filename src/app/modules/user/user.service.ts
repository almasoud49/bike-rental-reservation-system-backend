import config from "../../config";
import { UserModel } from "./user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';

// get user profile with access token
const getProfile = async (token: string) => {
  const { email, role } = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const user = await UserModel.findOne({ email, role });
  return user;
};

// const updateUserProfileIntoDb = async (payload: TUpdateUser, token: string) => {
//   const { email, role } = jwt.verify(
//     token,
//     config.jwt_access_secret as string,
//   ) as JwtPayload;
//   // check if a user exist with the email
//   const isUserExist = await UserModel.findOne({ email, role });
//   if (!isUserExist) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
//   }
//   const result = await UserModel.findOneAndUpdate({ email, role }, payload, {new: true}).select('-createdAt -updatedAt -__v');
//   return result;
// };

export const UserServices = {
  
  getProfile,
  // updateUserProfileIntoDb
  
};
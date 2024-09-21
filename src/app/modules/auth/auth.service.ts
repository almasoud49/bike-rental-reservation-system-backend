import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TLoginUser,TUser,TUpdateUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";

//Signup User
const createUserIntoDb = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  let user;
  if(result){
    user = await UserModel.findOne({email: payload.email}).select( '-password -createdAt -updatedAt -__v')
  }
  return user;
};

//Login a User
const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ email: payload.email }).select(
    '+password',
  );

  // check  user existence with the email
  if (!isUserExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No user found with this email!');
  };

  // check if password match
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExist?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Provided Password is Incorrect!');
  };

   // generate jwt access token
   const jwtPayload = {
    email: isUserExist?.email,
    role: isUserExist?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  );

  const user = await UserModel.findOne({email: payload.email}).select( '-createdAt -updatedAt -__v')
  return { accessToken, refreshToken, user };

};

//Access Token Generate
const generateAccessToken = async (refreshToken: string) => {
  const { email, role } = jwt.verify(
    refreshToken,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  
  // Check user existence with the email
  const isUserExist = await UserModel.findOne({ email, role });
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }

  const JwtPayload = {
    email,
    role,
  };

  const accessToken = jwt.sign(JwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return { accessToken, isUserExist };
};

// get user profile with access token
const getProfileFromDb = async (token: string) => {
  const { email, role } = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const user = await UserModel.findOne({ email, role }).select('-__v');
  return user;
};

// update user profile into db
const updateUserProfileIntoDb = async (payload: TUpdateUser, token: string) => {
  const { email, role } = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  // check if a user exist with the email
  const isUserExist = await UserModel.findOne({ email, role });
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }
  const result = await UserModel.findOneAndUpdate({ email, role }, payload, {
    new: true,
  }).select('-createdAt -updatedAt -__v');
  return result;
};

// get all users
const getAllUsersFromDb = async () => {
  const user = await UserModel.find().select('-__v');
  return user;
};

// delete user
const deleteUserFromDb = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new AppError(404, 'Invalid User id');
  }
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

// delete user
const updateUserRole = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new AppError(404, 'Invalid User id');
  }
  let role;
  if (user?.role === 'user') {
    role = 'admin';
  } else {
    role = 'user';
  }
  const result = await UserModel.findByIdAndUpdate(id, { role });
  return result;
};


export const AuthServices = {
  createUserIntoDb,
  loginUser,
  generateAccessToken,
  getProfileFromDb,
  updateUserProfileIntoDb,
  getAllUsersFromDb,
  deleteUserFromDb,
  updateUserRole


  
};
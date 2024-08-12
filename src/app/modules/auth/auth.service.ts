import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TLoginUser, } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";

//Signup User
const createUserIntoDb = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
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
      'No user found with this email!',
      'email',
    );
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

  return { isUserExist, accessToken, refreshToken };

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


export const AuthServices = {
  createUserIntoDb,
  loginUser,
  generateAccessToken
  
};
import { TLoginUser, TUser } from "./auth.interface";
import { UserModel } from "./auth.model";

const createUserIntoDb = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ email: payload.email }).select(
    '+password',
  );

  return isUserExist

}


export const AuthServices = {
  createUserIntoDb,
  loginUser
  
};
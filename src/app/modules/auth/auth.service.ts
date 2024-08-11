import { TUser } from "./auth.interface";
import { UserModel } from "./auth.model";

const createUserIntoDb = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};


export const AuthServices = {
  createUserIntoDb,
  
};
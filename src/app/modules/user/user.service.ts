import { TUser } from "../auth/auth.interface";
import { UserModel } from "../auth/auth.model";

const getProfileFromDb = async (token: TUser) => {
  const { email, role } = token

  const user = await UserModel.findOne({ email, role });
  return user;
};

export const UserServices = {
  
  getProfileFromDb,
  
};
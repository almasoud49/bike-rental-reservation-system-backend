import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const getProfile = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }

  const token = authHeader.split(' ')[1];
  const result = await UserServices.getProfile(token as string);
  sendResponse(res, {
    message: 'User profile retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  
  getProfile,
  
};
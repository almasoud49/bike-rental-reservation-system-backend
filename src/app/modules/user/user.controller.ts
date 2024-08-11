import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const getProfile = catchAsync(async (req, res) => {
  
  const email = req.body
  
   const result = await UserServices.getProfileFromDb(email);
  sendResponse(res, {
    message: 'User profile retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  
  getProfile,
  
};
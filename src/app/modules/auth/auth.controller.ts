import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";


const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.createUserIntoDb(userData);
  result.password = '';
  sendResponse(res, {
    message: 'User registered successfully!',
    status: 201,
    data: result,
  });
});

const loginUser =catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.loginUser(userData);
  sendResponse(res, {
    message: 'User logged in successfully',
    status: 201,
    data: result,
  })
})

export const AuthControllers = {
  createUser,
  loginUser
  
};
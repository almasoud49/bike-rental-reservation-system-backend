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

const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.loginUser(userData);
  const { accessToken, refreshToken, isUserExist } = result;
  isUserExist.password = '';
  res.cookie('refreshToken', refreshToken);
  sendResponse(
    res,
    {
      message: 'User logged in successfully!',
      data: isUserExist,
    },
    accessToken,
  );
});

const generateAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.generateAccessToken(refreshToken);
  sendResponse(
    res,
    {
      message: 'Access token generated successfully!',
      data: result.isUserExist,
    },
    result.accessToken,
  );
});

export const AuthControllers = {
  createUser,
  loginUser,
  generateAccessToken
  
};
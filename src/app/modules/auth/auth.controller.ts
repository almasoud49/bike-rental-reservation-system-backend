import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import dataNotFound from "../../utils/dataNotFound";


const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.createUserIntoDb(userData);

  sendResponse(res, {
    message: 'User registered successfully',
    status: 201,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.loginUser(userData);
  const { accessToken, refreshToken, user } = result;
  res.cookie('refreshToken', refreshToken);
  sendResponse(
    res,
    {
      message: 'User logged in successfully',
      data: user,
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

const getProfile = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }

  const token = authHeader.split(' ')[1];
  const result = await AuthServices.getProfileFromDb(token as string);
  sendResponse(res, {
    message: 'User profile retrieved successfully!',
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const updateDoc = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }

  const token = authHeader.split(' ')[1];

  const result = await AuthServices.updateUserProfileIntoDb(updateDoc, token);
  dataNotFound(result, res);
  sendResponse(res, {
    message: 'Profile updated successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUsersFromDb();
  sendResponse(res, {
    message: 'Users retrieved successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await AuthServices.deleteUserFromDb(req.params.id);
  sendResponse(res, {
    message: 'Users deleted successfully!',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const result = await AuthServices.updateUserRole(req.params.id);
  sendResponse(res, {
    message: 'Users role updated successfully!',
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
  generateAccessToken,
  getProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUserRole,
  
};
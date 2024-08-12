import  jwt, { JwtPayload }  from 'jsonwebtoken';
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import config from '../../config';
import { RentalServices } from './rental.service';
import sendResponse from '../../utils/sendResponse';
import dataNotFound from '../../utils/dataNotFound';

const createRental = catchAsync(async (req, res) => {
  const authHeader = req?.headers?.authorization as string;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }
  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const rentalData = req.body;
  const result = await RentalServices.createRental(rentalData, decoded);
  sendResponse(res, {
    message: 'Rental created successfully',
    status: 201,
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await RentalServices.returnBike(id);
  sendResponse(res, {
    message: 'Bike returned successfully',
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const authHeader = req?.headers?.authorization as string;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }
  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const result = await RentalServices.getAllRentals(decoded);
  dataNotFound(result, res);
  sendResponse(res, {
    message: 'Rentals retrieved successfully',
    data: result,
  });
});


export const RentalControllers = { 
  createRental, 
  returnBike, 
  getAllRentals 
};
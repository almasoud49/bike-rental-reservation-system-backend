import  jwt, { JwtPayload }  from 'jsonwebtoken';
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import config from '../../config';
import { RentalServices } from './rental.service';
import sendResponse from '../../utils/sendResponse';

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

export const RentalControllers = { 
  createRental, 
  // returnBike, 
  // getAllRentals 
};
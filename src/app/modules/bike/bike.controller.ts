import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BikeServices } from "./bike.service";
import dataNotFound from "../../utils/dataNotFound";

const createBike = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await BikeServices.createBike(data);
  sendResponse(res, {
    message: 'Bike added successfully',
    status: httpStatus.CREATED,
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikes();
 dataNotFound(result, res);
  sendResponse(res, {
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  // updateBike,
  // deleteBike,
};
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";
import dataNotFound from "../../utils/dataNotFound";

const createReview = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await ReviewServices.createReview(data);
  sendResponse(res, {
    message: 'Review added successfully',
    status: httpStatus.CREATED,
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviews();
 dataNotFound(result, res);
  sendResponse(res, {
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews
};


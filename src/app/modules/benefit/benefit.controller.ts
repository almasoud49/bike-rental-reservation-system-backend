import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import dataNotFound from "../../utils/dataNotFound";
import { BenefitServices } from "./benefit.service";

const createBenefit = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await BenefitServices.createBenefit(data);
  sendResponse(res, {
    message: 'Benefit added successfully',
    status: httpStatus.CREATED,
    data: result,
  });
});

const getAllBenefits = catchAsync(async (req, res) => {
  const result = await BenefitServices.getAllBenefits();
 dataNotFound(result, res);
  sendResponse(res, {
    message: 'Benefit retrieved successfully',
    data: result,
  });
});

export const BenefitControllers = {
  createBenefit,
  getAllBenefits
};


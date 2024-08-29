import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import dataNotFound from "../../utils/dataNotFound";
import { TeamServices } from "./team.service";

const createTeam = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await TeamServices.createTeam(data);
  sendResponse(res, {
    message: 'Team added successfully',
    status: httpStatus.CREATED,
    data: result,
  });
});

const getAllTeams = catchAsync(async (req, res) => {
  const result = await TeamServices.getAllTeams();
 dataNotFound(result, res);
  sendResponse(res, {
    message: 'Teams retrieved successfully',
    data: result,
  });
});

export const TeamControllers = {
  createTeam,
  getAllTeams
};


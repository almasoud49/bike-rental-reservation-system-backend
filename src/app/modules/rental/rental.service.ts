/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import { TRental } from "./rental.interface";
import mongoose, { Types } from "mongoose";
import { UserModel } from "../user/user.model";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import { RentalModel } from "./rental.model";
import { BikeModel } from "../bike/bike.model";

const createRental = async (
  payload: TRental,
  decodedInfo: JwtPayload,
) => {
  const { email, role } = decodedInfo;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await UserModel.findOne({ email, role }).select('_id');
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const userId = user._id as Types.ObjectId;
    payload.userId = userId;

    const result = await RentalModel.create([payload], { session });

    await BikeModel.findOneAndUpdate(
      { _id: payload.bikeId },
      { isAvailable: false },
      { new: true, session },
    );

    await session.commitTransaction();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(error.statusCode || httpStatus.BAD_REQUEST, error.message || 'Failed to create rental');
  } finally {
    session.endSession();
  }
};

export const RentalServices = {
  createRental,
  // returnBike,
  // getAllRentalsFromDb,
};
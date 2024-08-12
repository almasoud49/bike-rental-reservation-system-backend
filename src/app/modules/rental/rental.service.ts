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

const returnBike = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //return time set 
    const currentTime = new Date();
    const returnTime = currentTime.toISOString().split('.')[0] + 'Z';

    const rental = await RentalModel.findOne({ _id: id }).select(
      'startTime bikeId',
    );

    if (!rental) {
      throw new AppError(httpStatus.NOT_FOUND, 'Invalid rental ID!', 'id');
    }

    
    const bike = await BikeModel.findOne({ _id: rental.bikeId });
    if (!bike) {
      throw new AppError(httpStatus.NOT_FOUND, 'Invalid bike ID!', 'id');
    }

    // calculate total cost based on rental time
    const startTime = new Date(rental?.startTime) as any;
    const timeDifference = (new Date(returnTime) as any) - startTime;
    const totalHours = timeDifference / (1000 * 60 * 60);

    const totalCost = bike.pricePerHour * totalHours;
    const updateDoc = {
      isReturned: true,
      returnTime,
      totalCost: totalCost.toFixed(2),
    };
    const result = await RentalModel.findOneAndUpdate({ _id: id }, updateDoc, {
      new: true,
      session,
    });

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update rental!');
    }

    // update bike availability
    await BikeModel.findOneAndUpdate(
      { _id: rental.bikeId },
      { isAvailable: true },
      { session },
    );

    await session.commitTransaction();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(error.statusCode || httpStatus.BAD_REQUEST, error.message ||'Something went wrong!');
  }finally{
    await session.endSession();
  }
};

const getAllRentals = async (decoded: JwtPayload) => {
  const { email, role } = decoded;
  const user = await UserModel.findOne({ email, role });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }

  const result = await RentalModel.find({ userId: user?._id }).populate('userId').populate('bikeId');
  return result;
};

export const RentalServices = {
  createRental,
  returnBike,
  getAllRentals,
};
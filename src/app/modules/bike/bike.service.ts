import { TBike } from "./bike.interface";
import { BikeModel } from "./bike.model";

const createBike = async (payload: TBike) => {
  const result = await BikeModel.create(payload);
  return result;
};

// get bike from db
const getAllBikes = async () => {
  const result = await BikeModel.find().select('-createdAt -updatedAt -__v');
  return result;
};


export const BikeServices = {
  createBike,
  getAllBikes,
  // updateBikeIntoDb,
  // deleteBikeFromDb
};
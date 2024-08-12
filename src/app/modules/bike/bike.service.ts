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

const updateBike = async (payload: Partial<TBike>, id: string) => {
  const result = await BikeModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBike = async (id: string) => {
  const result = await BikeModel.findOneAndDelete({ _id: id }, { lean: true });
  return result;
};

export const BikeServices = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike
};
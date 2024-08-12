import { Schema, model } from 'mongoose';
import { TRental } from './rental.interface';
import { AppError } from '../../errors/AppError';
import { BikeModel } from '../bike/bike.model';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';

const rentalSchema = new Schema<TRental>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'user' 
  },
  bikeId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'bike' 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  returnTime: { 
    type: String, 
    default: null 
  },
  totalCost: { 
    type: Number, 
    default: 0 
  },
  isReturned: { 
    type: Boolean, 
    default: false 
  },
});

// check if user and bike exist 
rentalSchema.pre('save', async function () {
  const isBikeExist = await BikeModel.findOne({ _id: this.bikeId });
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid bike ID!', 'bikeId');
  };

  // check if the bike is available
  if (!isBikeExist.isAvailable) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      'The bike is not available! Try again using different bike.',
    );
  }

  const isUserExist = await UserModel.findOne({ _id: this.userId });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID!', 'userId');
  };
});

export const RentalModel = model<TRental>('Rental', rentalSchema);
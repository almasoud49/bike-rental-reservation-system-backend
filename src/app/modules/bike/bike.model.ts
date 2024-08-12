import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: true ,
      unique: true,
      trim: true,
    },
    description: { 
      type: String, 
      required: true  
    },
    pricePerHour: { 
      type: Number, 
      required: true  
    },
    isAvailable: { 
      type: Boolean, 
      default: true 
    },
    cc: { 
      type: Number, 
      required: true 
    },
    year: { 
      type: Number, 
      required: true  
    },
    model: { 
      type: String, 
      required: true 
    },
    brand: { 
      type: String, 
      required: true  
    },
  },
  { timestamps: true },
);

// check if bike already exist with the new given name
bikeSchema.pre('save', async function () {
  const isBikeExist = await BikeModel.findOne({ name: this?.name });

  if (isBikeExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A bike is already exist with the name',
      'name',
    );
  }
});

// check bike existence before updating
bikeSchema.pre('findOneAndUpdate', async function () {
  const query = this.getQuery();
  const bike = await BikeModel.findOne(query);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid bike id!');
  }
});

// throw error if no bike exist with the id
bikeSchema.pre('findOneAndDelete', async function () {
  const isBikeExist = await BikeModel.findOne(this.getQuery());

  if (!isBikeExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Invalid bike id!',
      'id',
    );
  }
});


export const BikeModel = model<TBike>('Bike', bikeSchema);
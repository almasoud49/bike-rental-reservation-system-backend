import { Schema, model } from 'mongoose';
import { TUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true, 
      select: 0 
    },
    phone: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String 
    },
    role: { 
      type: String, 
      enum: ['admin', 'user'],
      default: 'user', 
      required: true 
    },
  },
  { timestamps: true },
);

// hash user password
userSchema.pre('save', async function (next) {
  const isUserExist = await UserModel.findOne({ email: this.email });
  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'User already Exist!',

    );
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});



export const UserModel = model<TUser>('User', userSchema);
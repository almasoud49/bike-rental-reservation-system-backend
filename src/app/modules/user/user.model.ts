
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
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
      required: true },
  },
  { timestamps: true },
);



// hash user password
userSchema.pre('save', async function (next) {
  const isUserExist = await UserModel.findOne({ email: this.email });
  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'An user is already exist with this email!',
      'email',
    );
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const UserModel = model<TUser>('User', userSchema);
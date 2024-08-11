import { Schema, model } from 'mongoose';
import { TUser } from './auth.interface';

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
      enum: ['admin', 'user'], required: true },
  },
  { timestamps: true },
);

export const UserModel = model<TUser>('User', userSchema);
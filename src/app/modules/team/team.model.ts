import { model, Schema } from 'mongoose'
import { TTeam } from './team.interface'


const teamSchema = new Schema<TTeam>(
  {
    
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const TeamModel = model<TTeam>('Team', teamSchema)

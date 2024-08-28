import { model, Schema } from 'mongoose'
import { TReview } from './review.interface'

const reviewSchema = new Schema<TReview>(
  {
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
)

export const ReviewModel = model<TReview>('Review', reviewSchema)

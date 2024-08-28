import { ReviewModel } from './review.model'
import { TReview } from './review.interface'

const createReview = async (payload: TReview) => {
  const result = await ReviewModel.create(payload)
  return result
}

const getAllReviews = async () => {
  const result = await ReviewModel.find();
  return result
}

export const ReviewServices = {
  createReview,
  getAllReviews,
}

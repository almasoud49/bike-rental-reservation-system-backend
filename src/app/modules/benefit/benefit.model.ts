import { model, Schema } from 'mongoose'
import { TBenefit } from './benefit.interface'

const benefitSchema = new Schema<TBenefit>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const BenefitModel = model<TBenefit>('Benefit', benefitSchema)

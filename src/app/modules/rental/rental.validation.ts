import { z } from 'zod'

const rentalValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z.string({ required_error: 'BikeId is Required!' }),
    startTime: z.string({ required_error: 'Start time is Required!' }),
    returnTime: z.string().optional(),
    totalCost: z.string().optional(),
    isReturned: z.string().optional(),
  }),
});

export const RentalValidation = { rentalValidationSchema }

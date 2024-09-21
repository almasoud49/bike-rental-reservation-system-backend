"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalValidation = void 0;
const zod_1 = require("zod");
const rentalValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        bikeId: zod_1.z.string({ required_error: 'BikeId is Required!' }),
        startTime: zod_1.z.string({ required_error: 'Start time is Required!' }),
        returnTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.string().optional(),
        isReturned: zod_1.z.string().optional(),
    }),
});
exports.RentalValidation = { rentalValidationSchema };

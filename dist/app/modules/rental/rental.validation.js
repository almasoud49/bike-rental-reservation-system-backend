"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalValidation = void 0;
const zod_1 = require("zod");
const rentalValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        rentalData: zod_1.z.object({
            userId: zod_1.z.string().optional(),
            bikeId: zod_1.z.string({ required_error: 'bikeId is required!' }),
            startTime: zod_1.z.string({ required_error: 'start time is required!' }),
            returnTime: zod_1.z.string().optional(),
            totalCost: zod_1.z.string().optional(),
            isReturned: zod_1.z.string().optional(),
        }),
    }),
});
exports.RentalValidation = { rentalValidationSchema };

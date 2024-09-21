"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidations = void 0;
const zod_1 = require("zod");
const bikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is Required' }),
        description: zod_1.z.string({ required_error: 'Description is Required' }),
        pricePerHour: zod_1.z.number({ required_error: 'Price is Required' }),
        isAvailable: zod_1.z.boolean().optional(),
        cc: zod_1.z.number({ required_error: 'CC is Required' }),
        year: zod_1.z.number({ required_error: 'Year is Required' }),
        model: zod_1.z.string({ required_error: 'Model is Required' }),
        brand: zod_1.z.string({ required_error: 'Brand is Required' }),
    }),
});
const updateBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is Required' }).optional(),
        description: zod_1.z
            .string({ required_error: 'Description is Required' })
            .optional(),
        pricePerHour: zod_1.z.number({ required_error: 'Price is Required' }).optional(),
        isAvailable: zod_1.z.boolean().optional(),
        cc: zod_1.z.number({ required_error: 'CC is Required' }).optional(),
        year: zod_1.z.number({ required_error: 'Year is Required' }).optional(),
        model: zod_1.z.string({ required_error: 'Model is Required' }).optional(),
        brand: zod_1.z.string({ required_error: 'Brand is Required' }).optional(),
    }),
});
exports.BikeValidations = {
    bikeValidationSchema,
    updateBikeValidationSchema,
};

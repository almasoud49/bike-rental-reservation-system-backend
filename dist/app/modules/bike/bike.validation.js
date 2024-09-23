"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidations = void 0;
const zod_1 = require("zod");
const bikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        image: zod_1.z.string({ required_error: 'Image is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
        pricePerHour: zod_1.z.number({ required_error: 'Price is required' }),
        cc: zod_1.z.number({ required_error: 'CC is required' }),
        year: zod_1.z.number({ required_error: 'Year is required' }),
        model: zod_1.z.string({ required_error: 'Model is required' }),
        brand: zod_1.z.string({ required_error: 'Brand is required' }),
    }),
});
const updateBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        image: zod_1.z.string({ required_error: 'Image is required' }).optional(),
        description: zod_1.z
            .string({ required_error: 'Description is required' })
            .optional(),
        pricePerHour: zod_1.z.number({ required_error: 'Price is required' }).optional(),
        cc: zod_1.z.number({ required_error: 'CC is required' }).optional(),
        year: zod_1.z.number({ required_error: 'Year is required' }).optional(),
        model: zod_1.z.string({ required_error: 'Model is required' }).optional(),
        brand: zod_1.z.string({ required_error: 'Brand is required' }).optional(),
    }),
});
exports.BikeValidations = {
    bikeValidationSchema,
    updateBikeValidationSchema,
};

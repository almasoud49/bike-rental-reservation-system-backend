"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is Required!' }),
        email: zod_1.z.string({ required_error: 'Email is required!' }),
        password: zod_1.z.string({ required_error: 'Password is Required!' }),
        phone: zod_1.z.string({ required_error: 'Phone is Required!' }),
        address: zod_1.z.string().optional(),
        role: zod_1.z.enum(['admin', 'user'], {
            required_error: 'User role is Required!',
        }),
    }),
});
const updateUserProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required!' }).optional(),
        phone: zod_1.z.string({ required_error: 'Phone is required!' }).optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
    updateUserProfileValidationSchema,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenefitModel = void 0;
const mongoose_1 = require("mongoose");
const benefitSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.BenefitModel = (0, mongoose_1.model)('Benefit', benefitSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeModel = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const bikeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
        trim: true,
    },
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    description: { type: String, required: [true, 'description is required'] },
    pricePerHour: { type: Number, required: [true, 'price is required'] },
    isAvailable: { type: Boolean, default: true },
    cc: { type: String, required: [true, 'cc is required'] },
    year: { type: Number, required: [true, 'year is required'] },
    model: { type: String, required: [true, 'model is required'] },
    brand: { type: String, required: [true, 'brand is required'] },
}, { timestamps: true });
// check if bike already exist with the new given name
bikeSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const isBikeExist = yield exports.BikeModel.findOne({ name: this === null || this === void 0 ? void 0 : this.name });
        if (isBikeExist) {
            throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'A bike is already exist with the name');
        }
    });
});
// check bike existence before updating
bikeSchema.pre('findOneAndUpdate', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const bike = yield exports.BikeModel.findOne(query);
        if (!bike) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid Bike id!');
        }
    });
});
// throw error if no bike exist with the id
bikeSchema.pre('findOneAndDelete', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const isBikeExist = yield exports.BikeModel.findOne(this.getQuery());
        if (!isBikeExist) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid Bike id!');
        }
    });
});
exports.BikeModel = (0, mongoose_1.model)('Bike', bikeSchema);

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
exports.RentalModel = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errors/AppError");
const bike_model_1 = require("../bike/bike.model");
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = require("../auth/auth.model");
const rentalSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'user' },
    bikeId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'bike' },
    startTime: { type: String, required: true },
    returnTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    isAdvancePaid: { type: Boolean, default: false },
    advanceTransactionId: { type: String },
    transactionId: { type: String },
});
// check if user and bike exist 
rentalSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const isBikeExist = yield bike_model_1.BikeModel.findOne({ _id: this.bikeId });
        if (!isBikeExist) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid Bike ID!');
        }
        ;
        // check if the bike is available
        if (!isBikeExist.isAvailable) {
            throw new AppError_1.AppError(http_status_1.default.SERVICE_UNAVAILABLE, 'The bike is not available! Try again using different bike.');
        }
        const isUserExist = yield auth_model_1.UserModel.findOne({ _id: this.userId });
        if (!isUserExist) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid User ID!');
        }
        ;
    });
});
exports.RentalModel = (0, mongoose_1.model)('Rental', rentalSchema);

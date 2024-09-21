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
exports.RentalServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const rental_model_1 = require("./rental.model");
const bike_model_1 = require("../bike/bike.model");
const createRental = (payload, decodedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = decodedInfo;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield user_model_1.UserModel.findOne({ email, role }).select('_id');
        if (!user) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
        }
        const userId = user._id;
        payload.userId = userId;
        const result = yield rental_model_1.RentalModel.create([payload], { session });
        yield bike_model_1.BikeModel.findOneAndUpdate({ _id: payload.bikeId }, { isAvailable: false }, { new: true, session });
        yield session.commitTransaction();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.AppError(error.statusCode || http_status_1.default.BAD_REQUEST, error.message || 'Failed to create rental');
    }
    finally {
        session.endSession();
    }
});
const returnBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //return time set 
        const currentTime = new Date();
        const returnTime = currentTime.toISOString().split('.')[0] + 'Z';
        const rental = yield rental_model_1.RentalModel.findOne({ _id: id }).select('startTime bikeId');
        if (!rental) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid rental ID!', 'id');
        }
        const bike = yield bike_model_1.BikeModel.findOne({ _id: rental.bikeId });
        if (!bike) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid bike ID!', 'id');
        }
        // calculate total cost based on rental time
        const startTime = new Date(rental === null || rental === void 0 ? void 0 : rental.startTime);
        const timeDifference = new Date(returnTime) - startTime;
        const totalHours = timeDifference / (1000 * 60 * 60);
        const totalCost = bike.pricePerHour * totalHours;
        const updateDoc = {
            isReturned: true,
            returnTime,
            totalCost: totalCost.toFixed(2),
        };
        const result = yield rental_model_1.RentalModel.findOneAndUpdate({ _id: id }, updateDoc, {
            new: true,
            session,
        });
        if (!result) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to update rental!');
        }
        // update bike availability
        yield bike_model_1.BikeModel.findOneAndUpdate({ _id: rental.bikeId }, { isAvailable: true }, { session });
        yield session.commitTransaction();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.AppError(error.statusCode || http_status_1.default.BAD_REQUEST, error.message || 'Something went wrong!');
    }
    finally {
        yield session.endSession();
    }
});
const getAllRentals = (decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = decoded;
    const user = yield user_model_1.UserModel.findOne({ email, role });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const result = yield rental_model_1.RentalModel.find({ userId: user === null || user === void 0 ? void 0 : user._id }).populate('userId').populate('bikeId');
    return result;
});
exports.RentalServices = {
    createRental,
    returnBike,
    getAllRentals,
};

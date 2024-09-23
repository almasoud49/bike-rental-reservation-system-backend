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
exports.RentalServices = exports.BikeSearchableFields = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const rental_model_1 = require("./rental.model");
const bike_model_1 = require("../bike/bike.model");
const payment_utils_1 = require("../payment/payment.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const auth_model_1 = require("../auth/auth.model");
exports.BikeSearchableFields = ['name', 'brand', 'cc', 'price'];
const createRentalIntoDb = (payload, decodedInfo, paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    paymentInfo.success_url = `https://bike-rental-reservation-system-backend-six.vercel.app/api/rentals/advance-payment-success`;
    paymentInfo.fail_url = `https://bike-rental-reservation-system-backend-six.vercel.app/api/rentals/advance-payment-fail`;
    const paymentInit = yield (0, payment_utils_1.initiatePayment)(paymentInfo);
    if (!(paymentInit === null || paymentInit === void 0 ? void 0 : paymentInit.url)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_GATEWAY, 'Payment initiation failed!');
    }
    const { email, role } = decodedInfo;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield auth_model_1.UserModel.findOne({ email, role }).select('_id');
        if (!user) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access!');
        }
        const userId = user._id;
        payload.userId = userId;
        payload.isAdvancePaid = false;
        payload.advanceTransactionId = paymentInit === null || paymentInit === void 0 ? void 0 : paymentInit.transactionId;
        const result = yield rental_model_1.RentalModel.create([payload], { session });
        yield session.commitTransaction();
        return { result, paymentInitUrl: paymentInit === null || paymentInit === void 0 ? void 0 : paymentInit.url };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.AppError(error.statusCode || http_status_1.default.BAD_REQUEST, error.message || 'Failed to create rental');
    }
    finally {
        session.endSession();
    }
});
const makeAdvancePaymentSuccess = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rental_model_1.RentalModel.findOneAndUpdate({
        advanceTransactionId: transactionId,
    }, { isAdvancePaid: true });
    if (result) {
        yield bike_model_1.BikeModel.findByIdAndUpdate(result === null || result === void 0 ? void 0 : result.bikeId, {
            isAvailable: false,
        });
    }
    return result;
});
const makeAdvancePaymentFail = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rental_model_1.RentalModel.findOneAndDelete({
        advanceTransactionId: transactionId,
    });
    return result;
});
const returnBike = (id, rentalEndTime) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const rental = yield rental_model_1.RentalModel.findOne({ _id: id }).select('startTime bikeId');
        if (!rental) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid rental ID!', 'id');
        }
        // throw error if bike is not available
        const bike = yield bike_model_1.BikeModel.findOne({ _id: rental.bikeId });
        if (!bike) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid bike ID!', 'id');
        }
        // calculate rental cost based on time
        const startTime = new Date(`1970-01-01T${rental === null || rental === void 0 ? void 0 : rental.startTime}:00`);
        const endTime = new Date(`1970-01-01T${rentalEndTime}:00`);
        if (endTime <= startTime) {
            {
                throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'End time must be later than start time!');
            }
        }
        const diffInMilliseconds = endTime.getTime() - startTime.getTime();
        const rentalTimeInHours = diffInMilliseconds / (1000 * 60 * 60);
        const totalCost = rentalTimeInHours * (bike === null || bike === void 0 ? void 0 : bike.pricePerHour);
        const updateDoc = {
            isReturned: true,
            returnTime: rentalEndTime,
            totalCost: totalCost.toFixed(3),
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
const getAllRentalsFromDb = (decoded, query, myRentals) => __awaiter(void 0, void 0, void 0, function* () {
    if (myRentals === 'true') {
        const { email, role } = decoded;
        const userInfo = yield auth_model_1.UserModel.findOne({ email, role });
        if (!userInfo) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized!');
        }
        query.userId = userInfo === null || userInfo === void 0 ? void 0 : userInfo._id;
    }
    const bikeQuery = new QueryBuilder_1.default(rental_model_1.RentalModel.find()
        .select('-createdAt -updatedAt -__v')
        .populate('userId')
        .populate('bikeId'), query)
        .search(exports.BikeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield bikeQuery.modelQuery;
    const meta = yield bikeQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleRentalFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rental_model_1.RentalModel.findById(id)
        .select('-createdAt -updatedAt -__v')
        .populate('userId')
        .populate('bikeId');
    return result;
});
const makePayment = (rentalId, paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = yield rental_model_1.RentalModel.findById(rentalId);
    if (!rental) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Invalid rental Id!');
    }
    // initiate payment
    if (paymentInfo.total_amount < 100) {
        const extraAmount = 100 - (paymentInfo === null || paymentInfo === void 0 ? void 0 : paymentInfo.total_amount);
        const result = yield rental_model_1.RentalModel.findByIdAndUpdate(rentalId, {
            isPaid: true,
        });
        return {
            result,
            message: `Extra ৳${extraAmount} is refunded to your account. 😀`,
        };
    }
    else if ((paymentInfo === null || paymentInfo === void 0 ? void 0 : paymentInfo.total_amount) === 100) {
        const result = yield rental_model_1.RentalModel.findByIdAndUpdate(rentalId, {
            isPaid: true,
        });
        return {
            result,
            message: `Total cost and advance amount is equal! So, payment is done! 😀`,
        };
    }
    else {
        paymentInfo.success_url = `https://bike-rental-reservation-system-backend-six.vercel.app/api/rentals/payment-success/${rentalId}`;
        paymentInfo.fail_url = `https://bike-rental-reservation-system-backend-six.vercel.app/api/rentals/payment-fail`;
        const paymentInit = yield (0, payment_utils_1.initiatePayment)(paymentInfo);
        if (!(paymentInit === null || paymentInit === void 0 ? void 0 : paymentInit.url)) {
            throw new AppError_1.AppError(http_status_1.default.BAD_GATEWAY, 'Payment initiation failed!');
        }
        return { result: rental, paymentInitUrl: paymentInit === null || paymentInit === void 0 ? void 0 : paymentInit.url };
    }
});
const paymentSuccess = (transactionId, rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rental_model_1.RentalModel.findByIdAndUpdate(rentalId, {
        isPaid: true,
        transactionId,
    });
    return result;
});
const paymentFail = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rental_model_1.RentalModel.findOneAndUpdate({
        transactionId,
    }, { isPaid: false, transactionId: null });
    return result;
});
exports.RentalServices = {
    createRentalIntoDb,
    makeAdvancePaymentSuccess,
    makeAdvancePaymentFail,
    returnBike,
    getAllRentalsFromDb,
    getSingleRentalFromDb,
    makePayment,
    paymentSuccess,
    paymentFail
};

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
exports.BikeServices = exports.BikeSearchableFields = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const bike_model_1 = require("./bike.model");
exports.BikeSearchableFields = ['name', 'brand', 'cc', 'price'];
const createBike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.BikeModel.create(payload);
    return result;
});
// get bike from db
const getAllBikes = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeQuery = new QueryBuilder_1.default(bike_model_1.BikeModel.find().select('-createdAt -updatedAt -__v'), query)
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
const getSingleBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.BikeModel.findById({ _id: id }).select('-createdAt -updatedAt -__v');
    return result;
});
const updateBike = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.BikeModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.BikeModel.findOneAndDelete({ _id: id }, { lean: true });
    return result;
});
exports.BikeServices = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
};

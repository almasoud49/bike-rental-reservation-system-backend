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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeServices = void 0;
const bike_model_1 = require("./bike.model");
const createBike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.BikeModel.create(payload);
    return result;
});
// get bike from db
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.BikeModel.find().select('-createdAt -updatedAt -__v');
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
    updateBike,
    deleteBike
};

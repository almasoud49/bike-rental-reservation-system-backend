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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
}, { timestamps: true });
// hash user password
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUserExist = yield exports.UserModel.findOne({ email: this.email });
        if (isUserExist) {
            throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'An user is already exist with this email!', 'email');
        }
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);

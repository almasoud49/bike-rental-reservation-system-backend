"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data, token) => {
    return res.status(data.status || 200).json({
        success: true,
        statusCode: data.status || 200,
        message: data.message,
        token: token,
        data: data.data,
    });
};
exports.default = sendResponse;

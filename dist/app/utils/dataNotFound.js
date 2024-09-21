"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataNotFound = (result, res) => {
    if (result.length === 0 || !result) {
        return res.status(404).json({
            success: false,
            message: 'No Data Found',
            data: [],
        });
    }
};
exports.default = dataNotFound;

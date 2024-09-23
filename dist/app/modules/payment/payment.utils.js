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
exports.initiatePayment = void 0;
/* eslint-disable @typescript-eslint/no-require-imports */
const config_1 = __importDefault(require("../../config"));
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.sslcz_store_id;
const store_passwd = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.sslcz_store_password;
const is_live = false; //true for live, false for sandbox
function generateObjectId() {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomBytes = 'xxxxxxxxxxxxxxxx'.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));
    return timestamp + randomBytes;
}
const initiatePayment = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = generateObjectId();
    const { total_amount, currency, product_name, product_category, cus_name, cus_email, cus_add1, cus_country, cus_phone, success_url, fail_url, } = paymentInfo;
    const data = {
        total_amount,
        currency,
        tran_id: transactionId,
        success_url: `${success_url}/${transactionId}`,
        fail_url: `${fail_url}/${transactionId}`,
        cancel_url: 'https://www.youtube.com/',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'null',
        product_name,
        product_category,
        product_profile: 'null',
        cus_name,
        cus_email,
        cus_add1,
        cus_add2: 'null',
        cus_city: 'null',
        cus_state: 'null',
        cus_postcode: 'null',
        cus_country,
        cus_phone,
        cus_fax: 'null',
        ship_name: 'null',
        ship_add1: 'null',
        ship_add2: 'null',
        ship_city: 'null',
        ship_state: 'null',
        ship_postcode: 'null',
        ship_country: 'null',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const initPaymentUrl = sslcz
        .init(data)
        .then((apiResponse) => {
        return apiResponse.GatewayPageURL;
    });
    const url = yield initPaymentUrl;
    return { url, transactionId };
});
exports.initiatePayment = initiatePayment;

import jwt, { JwtPayload } from 'jsonwebtoken'
import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import config from '../../config'
import { RentalServices } from './rental.service'
import sendResponse from '../../utils/sendResponse'
import dataNotFound from '../../utils/dataNotFound'

const createRental = catchAsync(async (req, res) => {
  const authHeader = req?.headers?.authorization as string
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!')
  }
  const token = authHeader.split(' ')[1]

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload

  const { rentalData, paymentInfo } = req.body
  const result = await RentalServices.createRentalIntoDb(
    rentalData,
    decoded,
    paymentInfo,
  )
  sendResponse(res, {
    message: 'Rental created successfully',
    status: 201,
    data: result,
  })
})

const returnBike = catchAsync(async (req, res) => {
  const id = req?.params?.id
  const { rentalEndTime } = req.body
  const result = await RentalServices.returnBike(id, rentalEndTime)
  sendResponse(res, {
    message: 'Bike returned successfully',
    data: result,
  })
})

const getAllRentals = catchAsync(async (req, res) => {
  const queryData = req?.query
  const { myRentals, ...query } = queryData
  let decoded
  if (myRentals) {
    const authHeader = req?.headers?.authorization as string
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!')
    }
    const token = authHeader.split(' ')[1]

    const decodedInfo = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    decoded = decodedInfo
  }

  const result = await RentalServices.getAllRentalsFromDb(
    decoded as JwtPayload,
    query,
    myRentals as string,
  )
  dataNotFound(result, res)
  sendResponse(res, {
    message: 'Rentals retrieved successfully',
    data: result,
  })
})

const advancePaymentSuccess = catchAsync(async (req, res) => {
  const transactionId = req?.params?.transactionId
  await RentalServices.makeAdvancePaymentSuccess(transactionId)
  res.redirect(
    `http://localhost:5173/dashboard/user/my-rentals?booking=confirmed`,
  )
})


const advancePaymentFail = catchAsync(async (req, res) => {
  const transactionId = req?.params?.transactionId
  await RentalServices.makeAdvancePaymentFail(transactionId)
  res.redirect(
    `http://localhost:5173/advance-payment-failure`,
  )
})

const getSingleRental = catchAsync(async (req, res) => {
  const id = req?.params?.id
  const result = await RentalServices.getSingleRentalFromDb(id)
  sendResponse(res, {
    message: 'Rental retrieved successfully',
    data: result,
  })
})

const makePayment = catchAsync(async (req, res) => {
  const id = req?.params?.id
  const paymentInfo = req.body
  const result = await RentalServices.makePayment(id, paymentInfo)
  sendResponse(res, {
    message: result.message || 'Payment initiated successfully',
    data: result,
  })
})

const paymentSuccess = catchAsync(async (req, res) => {
  const transactionId = req?.params?.transactionId
  const rentalId = req?.params?.rentalId
  await RentalServices.paymentSuccess(transactionId, rentalId)
  res.redirect(
    `http://localhost:5173/payment-success/${transactionId}`,
  )
})

const paymentFail = catchAsync(async (req, res) => {
  const transactionId = req?.params?.transactionId
  await RentalServices.paymentFail(transactionId)
  res.redirect(
    `http://localhost:5173/payment-failure`,
  )
})

export const RentalControllers = {
  createRental,
  returnBike,
  getAllRentals,
  advancePaymentSuccess,
  advancePaymentFail,
  getSingleRental,
  makePayment,
  paymentSuccess,
  paymentFail,
}

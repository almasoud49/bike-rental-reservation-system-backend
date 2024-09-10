/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
const sendResponse = (
  res: Response,
  data: { 
    message: string; 
    status?: number; 
    data: any 
  },
  token?: string,
) => {
  return res.status(data.status || 200).json({
    success: true,
    statusCode: data.status || 200,
    message: data.message,
    token: token,
    data: data.data,
  });
};

export default sendResponse;
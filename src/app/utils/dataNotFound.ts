/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

const dataNotFound = (result: any, res: Response) => {
  if (result.length === 0 || !result) {
    return res.status(404).json({
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }
};
export default dataNotFound;
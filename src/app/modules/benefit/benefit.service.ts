import { TBenefit } from "./benefit.interface";
import { BenefitModel } from "./benefit.model";


const createBenefit = async (payload: TBenefit) => {
  const result = await BenefitModel.create(payload)
  return result
};

const getAllBenefits = async () => {
  const result = await BenefitModel.find();
  return result
};

export const BenefitServices = {
  createBenefit,
  getAllBenefits
}

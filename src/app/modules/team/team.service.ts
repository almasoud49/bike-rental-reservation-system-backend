import { TTeam } from "./team.interface";
import { TeamModel } from "./team.model";


const createTeam = async (payload: TTeam) => {
  const result = await TeamModel.create(payload)
  return result
}

const getAllTeams = async () => {
  const result = await TeamModel.find();
  return result
}

export const TeamServices = {
  createTeam,
  getAllTeams,
}

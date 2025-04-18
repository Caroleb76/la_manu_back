import moduleFormationService from "../../services/moduleFormationService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const moduleFormations = await moduleFormationService.getModuleFormations();
    ApiResponse.success(res, moduleFormations);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

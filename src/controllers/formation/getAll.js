import formationService from "../../services/formationService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const formations = await formationService.getFormations();
    ApiResponse.success(res, formations);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

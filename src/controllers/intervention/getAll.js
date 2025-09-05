import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const formations = await interventionService.getAll();
    ApiResponse.success(res, formations);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const interventions = await interventionService.getTotalAmountPerMonth();
    ApiResponse.success(res, interventions);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

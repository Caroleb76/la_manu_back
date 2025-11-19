import extraCostService from "../../services/extraCostService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const id = req.params.id;

    const user = await extraCostService.getExtraCostsByInterventionId(id);
    ApiResponse.success(res, user);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

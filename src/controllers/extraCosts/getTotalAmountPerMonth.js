import extraCostService from "../../services/extraCostService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const date = req.params.date;

    const total = await extraCostService.getTotalAmountPerMonth(date);
    ApiResponse.success(res, total);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

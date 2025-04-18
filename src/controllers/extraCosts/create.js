import ApiResponse  from "../../utils/apiResponse.js";
import extraCostService from "../../services/extraCostService.js";
export default async (req, res) => {
  try {
    const data = req.body;
    const payload = await extraCostService.createExtraCost(data);
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};
import extraCostService from "../../services/extraCostService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
      const users= await extraCostService.getExtraCosts();
      ApiResponse.success(res,users);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  };
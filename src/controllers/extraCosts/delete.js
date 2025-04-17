import extraCostService from "../../services/extraCostService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
      const id = req.params.id;
      const deleted= await extraCostService.deleteExtraCostById(id);
      ApiResponse.success(res,deleted, "Resource deleted");
    } catch (error) {
      ApiResponse.error(res, error);
    }
  };
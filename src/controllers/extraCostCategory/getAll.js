import extraCostCategoryService from "../../services/extraCostCategoryService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const users = await extraCostCategoryService.getAll();
    ApiResponse.success(res, users);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

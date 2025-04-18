import ApiResponse  from "../../utils/apiResponse.js";
import interventionCategoryService from "../../services/interventionCategoryService.js";
export default async (req, res) => {
    try {
        const interventionCategories = await interventionCategoryService.getAll();
        ApiResponse.success(res,interventionCategories);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
import ApiResponse  from "../../utils/apiResponse.js";
import interventionCategoryService from "../../services/interventionCategoryService.js";
export default async (req, res) => {
    try {
        const data = req.body;
        const interventionCategory = await interventionCategoryService.create(data);
        ApiResponse.success(res,interventionCategory);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
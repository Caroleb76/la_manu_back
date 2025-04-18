import ApiResponse  from "../../utils/apiResponse.js";
import interventionCategoryService from "../../services/interventionCategoryService.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        const interventionCategory = await interventionCategoryService.destroy(id);
        ApiResponse.success(res,interventionCategory);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
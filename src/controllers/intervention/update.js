import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const intervention = await interventionService.update(id, data);
        ApiResponse.success(res,intervention);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
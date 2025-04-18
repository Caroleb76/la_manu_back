import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const data = req.body;
        const intervention = await interventionService.create(data);
        ApiResponse.success(res,intervention, "Resource created");
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
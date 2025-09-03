import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const data = req.body;
        // TODO : check if shit is am / pm/ day
        const intervention = await interventionService.createMany(data);
        ApiResponse.success(res,intervention, "Resource created");
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
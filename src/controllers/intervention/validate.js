import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const interventionId = req.params.id;
        const intervention = await interventionService.validateIntervention(interventionId,req.currentUser);
        ApiResponse.success(res,intervention, "Resource created");
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
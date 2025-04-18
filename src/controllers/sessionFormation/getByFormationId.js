import sessionFormationService from "../../services/sessionFormationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const formationId = req.params.id;
        const sessions = await sessionFormationService.getByFormationId(formationId);
        ApiResponse.success(res,sessions);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
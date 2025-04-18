import sessionFormationService from "../../services/sessionFormationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const sessionId= req.params.id;
        const session = await sessionFormationService.getById(sessionId);
        ApiResponse.success(res,session);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
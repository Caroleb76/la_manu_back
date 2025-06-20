import sessionFormationService from "../../services/sessionFormationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const offset = parseInt(req.query?.offset) || 0;
        const limit = parseInt(req.query?.limit) || 0;
        const session = await sessionFormationService.getSessions(offset,limit);
        ApiResponse.success(res,session);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
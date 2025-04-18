import sessionFormationService from "../../services/sessionFormationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const data = req.body;
        const session = await sessionFormationService.create(data);
        ApiResponse.success(res,session, "Resource created");
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
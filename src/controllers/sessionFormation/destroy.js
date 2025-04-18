import sessionFormationService from "../../services/sessionFormationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        const session = await sessionFormationService.destroy(id);
        ApiResponse.success(res,session, "Resource deleted");
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
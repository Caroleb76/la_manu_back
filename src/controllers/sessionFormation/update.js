import sessionFormationService from "../../services/sessionFormationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const session = await sessionFormationService.update(id, data);
        ApiResponse.success(res,session, "Resource updated");
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
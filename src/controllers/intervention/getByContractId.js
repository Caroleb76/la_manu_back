import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        const interventions = await interventionService.getByContractId(id);
        ApiResponse.success(res,interventions);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
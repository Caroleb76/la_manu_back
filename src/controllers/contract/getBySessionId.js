import contractService from "../../services/contractService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const sessionId= req.params.sessionId;
        const contracts = await contractService.getAllContractsBySessionId(sessionId);
        ApiResponse.success(res,contracts);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
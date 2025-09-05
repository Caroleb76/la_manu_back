import contractService from "../../services/contractService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const userId= req.params.id;
        const contracts = await contractService.getAllContractsByUserId(userId);
        ApiResponse.success(res,contracts);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
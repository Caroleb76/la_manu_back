import contractService from "../../services/contractService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.contractId;
        const contract = await contractService.sign(id);

        ApiResponse.success(res,contract);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
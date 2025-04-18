import contractService from "../../services/contractService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        const contract = await contractService.destroy(id);
        ApiResponse.success(res,contract);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
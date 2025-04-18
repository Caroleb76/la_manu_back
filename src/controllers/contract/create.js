import contractService from "../../services/contractService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const data = req.body;
        const contract = await contractService.create(data);
        ApiResponse.success(res,contract, "Resource created");
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
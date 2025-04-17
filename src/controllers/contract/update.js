import contractService from "../../services/contractService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const contract = await contractService.update(id, data);
        ApiResponse.success(res,contract);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
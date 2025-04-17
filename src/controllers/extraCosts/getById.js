import extraCostService from "../../services/extraCostService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const user = await extraCostService.getExtraCostById(id);
        ApiResponse.success(res,user);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
import extraCostService from "../../services/extraCostService.js";
import ApiResponse  from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const date = req.params.date;
        const user = await extraCostService.totalMonthly(date);
        ApiResponse.success(res,user);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
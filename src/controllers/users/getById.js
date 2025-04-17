import userService from "../../services/userService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const user = await userService.getUserById(id);
        ApiResponse.success(res,user, "Resource created");
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
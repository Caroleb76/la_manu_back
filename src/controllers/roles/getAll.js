import roleService from "../../services/roleService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
      const users= await roleService.getRoles();
      ApiResponse.success(res,users);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  };
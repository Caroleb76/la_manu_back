import { ApiResponse } from "../../utils/apiResponse.js";
import roleService from "../../services/roleService.js";
export default async (req, res) => {
  try {
    const data = req.body;
    const payload = await roleService.createRole(data);
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};
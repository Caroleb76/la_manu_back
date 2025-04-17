import { ApiResponse } from "../../utils/apiResponse.js";
import UserService from "../../services/userService.js";
export default async (req, res) => {
  try {
    const data = req.body;
    const payload = await UserService.createUser(data);
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};
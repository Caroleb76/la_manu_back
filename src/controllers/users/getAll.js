import userService from "../../services/userService.js";
import ApiResponse  from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
      const users= await userService.getUsers();
      ApiResponse.success(res,users);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  };
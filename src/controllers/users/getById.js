import userService from "../../services/userService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userService.getUserById(id);
    ApiResponse.success(res, user, "user found");
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

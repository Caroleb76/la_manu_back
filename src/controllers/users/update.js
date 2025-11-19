import ApiResponse from "../../utils/apiResponse.js";
import userService from "../../services/userService.js";
export default async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body.user ? JSON.parse(req.body.user) : {};
    const files = req.files;

    const payload = await userService.updateUserById(id, { ...user, files });
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, error);
  }
};

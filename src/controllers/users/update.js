import ApiResponse  from "../../utils/apiResponse.js";
import userService from "../../services/userService.js";
export default async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body.user ? JSON.parse(req.body.user) : {};
    const files = req.files;
    console.log("ID:", id);
    console.log("User data:", user);
    console.log("Files:", files);
    
    const payload = await userService.updateUserById(id, {...user, files});
    return ApiResponse.success(res, {}, "Resource created");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};
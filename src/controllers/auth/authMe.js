import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    return ApiResponse.success(res, req.currentUser, "User Validated");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};
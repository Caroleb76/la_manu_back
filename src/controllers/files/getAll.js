import fileService from "../../services/fileService.js";
import ApiResponse  from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
      const userId = req.params.userId;
      const users= await fileService.getFilesByUserId(userId);
      ApiResponse.success(res,users);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  };
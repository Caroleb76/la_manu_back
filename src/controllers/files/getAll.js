import fileService from "../../services/fileService.js";
import ApiResponse  from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
      const users= await fileService.getFiles();
      ApiResponse.success(res,users);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  };
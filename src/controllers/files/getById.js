import fileService from "../../services/fileService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const { userId, filename } = req.params;
    const filePath = path.join("files", userId, filename);

    res.download(filePath);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

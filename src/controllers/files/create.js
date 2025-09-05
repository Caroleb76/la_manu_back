import ApiResponse from "../../utils/apiResponse.js";
import fileService from "../../services/fileService.js";
export default async (req, res) => {
  try {
    const uploadedFile = req.file; 
    const { filename,userId, extraCostId } = req.body;

    if (!uploadedFile || !userId || !filename) {
      return ApiResponse.error(res, "Missing file, user or filename", 400);
    }
    
    const payload = await fileService.createFile({
      userId,
      name: filename,
      path: uploadedFile.path,
      extraCostId
    });

    return ApiResponse.success(res, payload, "Resource created");

  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};
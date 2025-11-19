import fileService from "../../services/fileService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await fileService.deleteFileById(id, true);
    ApiResponse.success(res, deleted, "Resource deleted");
  } catch (error) {
    ApiResponse.error(res, error);
  }
};

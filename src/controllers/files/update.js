import { ApiResponse } from "../../utils/apiResponse.js";
import fileService from "../../services/fileService.js";

export default async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const payload = await fileService.updateFileById(id, data);
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};
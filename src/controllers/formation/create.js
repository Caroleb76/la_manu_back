import { ApiResponse } from "../../utils/apiResponse.js";
import formationService from "../../services/formationService.js";
export default async (req, res) => {
  try {
    const data = req.body;
    const payload = await formationService.createFormation(data);
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};

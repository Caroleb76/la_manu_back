import formationService from "../../services/formationService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const formation = await formationService.getFormationById(id);
    ApiResponse.success(res, formation, "Resource created");
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

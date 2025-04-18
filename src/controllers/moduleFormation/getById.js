import moduleFormationService from "../../services/moduleFormationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const moduleFormation = await moduleFormationService.getModuleFormationById(
      id
    );
    ApiResponse.success(res, moduleFormation, "Resource created");
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

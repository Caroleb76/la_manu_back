import moduleFormationService from "../../services/moduleFormationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const formationId = req.params.formationId;

    const moduleFormation =
      await moduleFormationService.getModuleFormationByFormationId(formationId);
    ApiResponse.success(res, moduleFormation, "Resource created");
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

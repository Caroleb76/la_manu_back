import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const formationId = req.params.formationId;
    const userId = req.params.userId;
    const formations = await interventionService.getByFormationandUserId(
      formationId,
      userId,
    );
    ApiResponse.success(res, formations);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

import contractService from "../../services/contractService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const filter = req.isAdmin ? null : { userId: req.currentUser.id };
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const searchText = req.query.searchText || null;
    const contracts = await contractService.getAll(
      filter,
      offset,
      limit,
      searchText,
    );
    ApiResponse.success(res, contracts);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

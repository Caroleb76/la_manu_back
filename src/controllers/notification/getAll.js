import notificationService from "../../services/notificationService.js";
import ApiResponse from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const searchText = req.query.searchText || null;
    
    const notifications = await notificationService.getNotifications( offset, limit, searchText);
    
    ApiResponse.success(res, notifications);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

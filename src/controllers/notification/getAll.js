import notificationService from "../../services/notificationService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications();
    ApiResponse.success(res, notifications);
  } catch (error) {
    return ApiResponse.error(res, error);
  }
};

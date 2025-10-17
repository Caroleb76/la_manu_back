import ApiResponse from "../../utils/apiResponse.js";
import notificationService from "../../services/notificationService.js";
import { createNotificationSchema } from "../../validators/createNotificationSchema.js";

export default async (req, res) => {
  try {
    const data = req.body;
    const validated = createNotificationSchema.parse(data)
    const payload = await notificationService.createNotification(validated);
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, error);
  }
};


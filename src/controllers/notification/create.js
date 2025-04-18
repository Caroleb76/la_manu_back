import { ApiResponse } from "../../utils/apiResponse.js";
import notificationService from "../../services/notificationService.js";

export default async (req, res) => {
  try {
    const data = req.body;
    const payload = await notificationService.createNotification(data);
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};

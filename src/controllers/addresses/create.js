import { ApiResponse } from "../../utils/apiResponse.js";
import addressService from "../../services/addressService.js";
export default async (req, res) => {
  try {
    const data = req.body;
    const payload = await addressService.createAddress(data);
    return ApiResponse.success(res, payload, "Resource created");
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error);
  }
};
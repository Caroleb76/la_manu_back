import addressService from "../../services/addressService.js";
import { ApiResponse } from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
      const users= await addressService.getAddresses();
      ApiResponse.success(res,users);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  };
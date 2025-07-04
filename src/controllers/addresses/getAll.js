import addressService from "../../services/addressService.js";
import ApiResponse  from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
      const offset= parseInt(req.query?.offset) || 0;
      const limit= parseInt(req.query?.limit) || 10;
      const searchText= req.query?.searchText || null;
      const users= await addressService.getAddresses(limit,offset,searchText);
      ApiResponse.success(res,users);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  };
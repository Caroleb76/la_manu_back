import userService from "../../services/userService.js";
import ApiResponse  from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
    
      
      const offset= parseInt(req.query?.offset) || 0;
      const limit= parseInt(req.query?.limit) || 0;
      const users= await userService.getUsers(offset,limit);

      
      return ApiResponse.success(res,users);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  };
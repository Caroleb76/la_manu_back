import {ApiResponse} from "../../utils/apiResponse.js";
export default (req, res) => {
    try {
      const body = req.body;
      console.log(req.json);
      
    return ApiResponse.success(res, body, "Resource created");
    } catch (error) {
      console.log(error);
      return ApiResponse.error(res, error);
    }
  };
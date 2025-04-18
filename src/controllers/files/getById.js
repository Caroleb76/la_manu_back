import fileService from "../../services/fileService.js";
import ApiResponse  from "../../utils/apiResponse.js";
export default async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const user = await fileService.getFileById(id);
        ApiResponse.success(res,user);
    } catch (error) {
        return ApiResponse.error(res, error);
    }
};
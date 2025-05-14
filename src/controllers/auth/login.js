import authService from "../../services/authService.js";
import ApiResponse from "../../utils/apiResponse.js";

export default async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body);
        
        if(!email || !password) throw new Error("Il manque des champs");
        const user = await authService.login(email, password);
        ApiResponse.success(res, {user});
    }catch (error) {
        ApiResponse.error(res, error);
    }
}
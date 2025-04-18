import ApiResponse from "../utils/apiResponse.js"
import userService from "../services/userService.js";
export default async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        // authorization : Bearer token [Bearer, token]// null
        if(!token){
            throw new Error("Unauthorized");
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);
        if(!decoded) throw new Error("Unauthorized");
        const user = await userService.getUserById(decoded.userId);
        if(!user) throw new Error("Unauthorized");
        req.currentUser = user;
        next();

    } catch (error) {
        return ApiResponse.error(res, error);
    }
}
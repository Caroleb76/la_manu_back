import ApiResponse from "../utils/apiResponse.js";
import authService from "../services/authService.js";
import userService from "../services/userService.js";
import { ROLES } from "../utils/constants.js";

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // authorization : Bearer token [Bearer, token]// null
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decoded = await authService.validateToken(token);
    const user = await userService.getUserById(decoded.userId);
    const isAdmin = user.role.name == ROLES.ADMIN;

    user.token = token;
    if (!user) throw new Error("Unauthorized");
    req.currentUser = user;
    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    return ApiResponse.error(res, error, 401);
  }
};

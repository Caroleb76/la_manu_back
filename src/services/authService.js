import passwordUtils from "../utils/utils.js";
import userService from "./userService.js";
import jsonwebtoken from "jsonwebtoken";
const login = async (email, password) => {
    try {
        const user= await userService.getUserByEmail(email);
        const passwordValid = passwordUtils.verifyPassword(password, user.password);
        if(!passwordValid) throw new Error("Mot de passe incorrect");
        const secret = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken.sign({userId: user.id}, secret, {expiresIn: "3h"});
        user.token=token;
        return user;

    } catch (error) {
        console.error(error);
        throw error;
    }
}


export default {
     login, 
    // authMe user:{name:"Pedrito",lastName:"Escobar"}
}
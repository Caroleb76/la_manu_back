import passwordUtils from "../utils/utils.js";
import userService from "./userService.js";
import jsonwebtoken from "jsonwebtoken";
import { generateRandomPassword } from "../utils/password.js";
const login = async (email, password) => {
    try {
        const user = await userService.getUserByEmail(email);
        const passwordValid = await passwordUtils.verifyPassword(
            password,
            user.password
        );
        if (!passwordValid) throw new Error("Mot de passe incorrect");
        if (user.blocked) throw new Error("Utilisateur bloqué");
        const secret = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken.sign({ userId: user.id }, secret, {
            expiresIn: "3h",
        });
        user.token = token;
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const resetPassword = async (email, randomPassword) => {
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) throw new Error("Utilisateur introuvable");
        if (user.blocked) throw new Error("Utilisateur bloqué");

        const updatedUser = await userService.updatePassword(user.id, randomPassword);
        if (!updatedUser)
            throw new Error("Erreur dans la modification du mot de passe");

        return updatedUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    login,
    resetPassword,
    // authMe user:{name:"Pedrito",lastName:"Escobar"}
};

import ApiResponse from "../../utils/apiResponse.js";
import userService from "../../services/userService.js";
import { generateRandomPassword } from "../../utils/password.js";
import { sendNewUserPasswordEmail } from "../../email/userPassword.js";
export default async (req, res) => {
  try {
    const data = req.body;
    //Créer MDP aleatoire

    if (!data.password || data.password === "") {
      const randomPassword = generateRandomPassword();
      data.password = randomPassword;
    }

    // On remplace/ajoute le mot de passe aléatoire dans les données reçues

    //envoie le mdp dans la création d'utilisateur
    const createdUser = await userService.createUser(data);

    if (!createdUser) {
      throw new Error("user not created");
    }

    //envoie le mdp par mail
    const emailReponse = await sendNewUserPasswordEmail(
      createdUser,
      data.password,
    );

    if (!emailReponse) {
      throw new Error("email not sent");
    }

    const response = {
      emailReponse,
      createdUser,
    };

    return ApiResponse.success(res, response, "Resource created");
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, error);
  }
};

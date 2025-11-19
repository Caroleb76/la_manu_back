import authService from "../../services/authService.js";
import ApiResponse from "../../utils/apiResponse.js";
import { generateRandomPassword } from "../../utils/password.js";
import { sendResetPasswordEmail } from "../../email/resetPassword.js";
export default async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) throw new Error("Il manque des champs");
    const randomPassword = generateRandomPassword();

    const resetResponse = await authService.resetPassword(
      email,
      randomPassword,
    );
    if (!resetResponse)
      throw new Error("Erreur dans la modification du mot de passe");

    //envoi de l'email
    const emailReponse = await sendResetPasswordEmail(
      resetResponse,
      randomPassword,
    );
    if (!emailReponse) throw new Error("Erreur dans l'envoi de l'email");

    const response = {
      emailReponse,
      resetResponse,
    };

    ApiResponse.success(res, { response });
  } catch (error) {
    ApiResponse.error(res, error);
  }
};

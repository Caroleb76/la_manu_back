import contractService from "../../services/contractService.js";
import emailService from "../../services/emailService.js";
import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
import { toStandardDate } from "../../utils/date.js";
import userService from "../../services/userService.js";

export default async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      throw new Error("aucune donnée reçue");
    }

    //Create contract
    const createdContract = await contractService.create(data);

    if (!createdContract) {
      throw new Error("contract not created");
    }

    //Récupérer l'email de l'utilisateur
    const user = await userService.getUserById(createdContract.userId);

    //if contract created send email
    const emailReponse = await emailService.sendEmail({
      from: "Ifen Le Havre <ifen-le-havre@demo.com>",
      to: user.email,
      subject: "Nouveau contrat à signer",
      text: `Nouveau contrat à signer - Bonjour,${user.firstName} ${user.lastName} Un nouveau contrat a été créé dans votre espace. Vous devez à présent le signer en vous rendant sur l'onglet "contrat" de votre espace. Cordialement. L'équipe IFEN. Ceci est un email automatique, merci de ne pas y répondre`, // plain text body
      html: `<h1>Nouveau contrat à signer</h1>
            <h2>Bonjour, ${user.firstName} ${user.lastName}</h2>
            <p>Un nouveau contrat a été créé dans votre espace. Vous devez à présent le signer en vous rendant sur l'onglet "contrat" de votre espace.</p>
            <p>Cordialement</p>
            <p>L'équipe IFEN</p>
            <br>
            <br>
            <p>Ceci est un email automatique, merci de ne pas y répondre</p>
            `, // html body
    });

    if (!emailReponse) {
      throw new Error("email not sent");
    }

    const response = {
      emailReponse,
      createdContract,
    };

    ApiResponse.success(res, response, "Resource created");
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, error);
  }
};

// dateIntervention: "2025-07-19"
// description: ""
// extraCosts: ['{"label":"Repas","id":"751d6ce6-079c-4b6a-931e-9c2d2697cf2c"}']
// hours: 2
// interventionCategoryId: "a34db267-7701-4039-ae5f-b61852246d71"
// interventionCategoryName: "Correction de copie"
// moduleId: "6a88756b-a697-4d90-b15b-a7cdf98b42e4"
// moduleName: "Formation Web Design"
// shift: "pm"

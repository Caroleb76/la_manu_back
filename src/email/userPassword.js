import emailService from "../services/emailService.js";

export async function sendNewUserPasswordEmail(user, randomPassword) {
  const emailReponse = await emailService.sendEmail({
    from: "Ifen Le Havre <ifen-le-havre@demo.com>",
    to: user.email,
    subject: "Création de votre compte - Nouveau mot de passe",
    text: `Nouveau contrat à signer - Bonjour,${user.firstName} ${user.lastName} Un nouveau contrat a été créé dans votre espace. Vous devez à présent le signer en vous rendant sur l'onglet "contrat" de votre espace. Cordialement. L'équipe IFEN. Ceci est un email automatique, merci de ne pas y répondre`, // plain text body
    html: `<h1>Création de votre compte</h1>
                <h2>Bonjour, ${user.firstName} ${user.lastName}</h2>
                <p>Votre compte a été créé avec succès. Pour vous identifier vous trouvez votre mot de passe ci-dessous :</p>
                <p>Mot de passe : ${randomPassword}</p>
                <br>
                <br>
                <p>L'équipe IFEN</p>
                <br>
                <br>
                <p>Ceci est un email automatique, merci de ne pas y répondre</p>
                `, // html body
  });
  return emailReponse;
}

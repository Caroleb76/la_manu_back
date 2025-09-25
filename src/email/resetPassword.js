import emailService from "../services/emailService.js";

export async function sendResetPasswordEmail(user, randomPassword) {
    const emailReponse = await emailService.sendEmail({
        from: "Ifen Le Havre <ifen-le-havre@demo.com>",
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        text: `Bonjour,${user.firstName} ${user.lastName} Un nouveau mot de passe a été généré pour votre compte. Merci de vous reconnecter en utilisant le mot de passe ci-dessous.`, // plain text body
        html: `<h1>Réinitialisation de votre mot de passe</h1>
                <h2>Bonjour, ${user.firstName} ${user.lastName}</h2>
                <p>Un nouveau mot de passe a été généré pour votre compte. Merci de vous reconnecter en utilisant le mot de passe ci-dessous:</p>
                <p>Mot de passe : ${randomPassword}</p>
                <br>
                <br>
                <p>L'équipe IFEN</p>
                <br>
                <br>
                <p>Ceci est un email automatique, merci de ne pas y répondre</p>
                `, // html body
    });
    return emailReponse
}

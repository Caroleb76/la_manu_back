import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
 const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false, // true for 465, false for other ports
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
});


const defaultParameters = {
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to : "bar@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain text body
    html : "<b>Hello world?</b>", // html body
}



// Wrap in an async IIFE so we can use await.
async function sendEmail(parameters){
const info = await transporter.sendMail({
    from: parameters.from,
    to: parameters.to,
    subject: parameters.subject,
    text: parameters.text, // plain‑text body
    html: parameters.html, // HTML body
  });
  if(info.accepted.length < 1) {
    throw new Error("email not sent")
  }


  return info
}


export default {sendEmail, defaultParameters}
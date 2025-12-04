// const sendNodeMailer = async (options) => {
//   // Importing nodemailer inside the function to avoid issues if the module is not used elsewhere
//   const nodemailer = require('nodemailer');
//     // Create a transporter object using SMTP transport
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//         auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });
//     // Define email options
//     const mailOptions = {
//         from: process.env.SMTP_FROM_EMAIL,
//         to: options.email,
//         subject: options.subject,
//         html: options.message,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
// };


// export default sendNodeMailer;




import nodemailer from "nodemailer";

const sendNodeMailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "me@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export default sendNodeMailer;


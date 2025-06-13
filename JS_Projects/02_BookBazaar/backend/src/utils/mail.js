import nodemailer from "nodemailer";

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // use SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
// Configure the mailOptions object
export const sendEmailVerification = async (toEmail, verificationToken) => {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to:toEmail,
    subject: "User verification",
    text: `For verification of your account click the link below ${process.env.BASE_URL}/api/v1/auth/verify/${verificationToken} `,
    html: "<b>Verify your account</b>",
  };

  try {
    const info =  transporter.sendMail(mailOptions)
      console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error: ", error);
  }
};

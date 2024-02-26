const nodemailer = require("nodemailer");
const path = require("path");
const logoPath = path.join(__dirname, "..", "uploads", "admin", "logo.jpg");

const sendEmail = async (user, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // True for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `EasyJob <${process.env.EMAIL_USER}>`, // Ensure this is a verified sender address
    to: user.email, // Recipient email address
    subject,
    html: message,
    attachments: [
      {
        filename: "logo.jpg",
        path: logoPath,
        cid: "unique@nodemailer.com", //same cid value as in the html img src
      },
    ], // HTML body content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

module.exports = sendEmail;

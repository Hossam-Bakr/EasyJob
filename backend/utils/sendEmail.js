const nodemailer = require("nodemailer");

const sendEmail = async (user, resetCode) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // True for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }
.container {
  width: 60% !important; 
  margin : 25px auto ; 

}

    .header {
      background-color: #005a9c;
      color: white;
      padding: 20px 0;
      text-align: center;
    }
    .content {
      padding: 40px 20px;
      background-color: #eee;
      text-align: left;
    }
    .footer {
      text-align: center;
      padding: 20px 20px;
      font-size: 0.8em;
      color: #fff;
      background-color: black ;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #005a9c;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
  </head>
  <body>
   <div class="container">  <div class="header">
   <h1>EasyJob Password Reset</h1>
 </div>
 <div class="content">
   <h2>Hello, ${user.firstName}</h2>
   <p>We received a request to reset your password for your EasyJob account. Please use the code below to proceed.</p>
   <div style=" padding: 10px; margin: 8px 0; font-weight : bold ; text-align:left ; ">
     <h3 style="color: #005a9c;">Reset Code: ${resetCode}</h3>
   </div>
   <p>Enter this code on the password reset page to create a new password for your account.</p>
 </div>
 <div class="footer">
   Thank you for helping us to keep your account secure.
   <br>
   If you didn't request this, please ignore this email.
 </div>
 </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: '"EasyJob Company" <your@verifieddomain.com>', // Ensure this is a verified sender address
    to: user.email, // Recipient email address
    subject: "Reset Your Password", // Email subject
    html: message, // HTML body content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

module.exports = sendEmail;

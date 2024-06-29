const createContactUsMessage = (name, email, subject, message) => {
    const htmlMessage = `
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
          width: 80%;
          margin: 25px auto;
        }
        .header {
          background-color: #005a9c;
          color: white;
          padding: 20px 0;
          text-align: center;
          padding: 40px 20px;
        }
        .content {
          padding: 40px 20px;
          background-color: #eee;
          text-align: left;
          position: relative;
        }
        .footer {
          text-align: center;
          padding: 20px 20px;
          font-size: 0.8em;
          color: #fff;
          background-color: black;
        }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Us Message</h1>
          </div>
          <div class="content">
            <h2>Hello,</h2>
            <p>You have received a new message from your EasyJob Contact Us form:</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <div class="footer">
            Thank you for using EasyJob.
            <br>
            If you didn't expect this, please ignore this email.
          </div>
        </div>
      </body>
      </html>
    `;
    return htmlMessage;
  };
  
  module.exports = createContactUsMessage;
  
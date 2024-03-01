const createResetCodeMessage = (name , resetCode) => {
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
      width: 80% !important; 
      margin : 25px auto ; 
  
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
        position: relative  !important;
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
     <div class="container"> 
      <div class="header">
     <h1>EasyJob Password Reset</h1>
   </div>
   <div class="content">
     <h2>Hello, ${name}</h2>
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
  return message;
};

module.exports = createResetCodeMessage ; 
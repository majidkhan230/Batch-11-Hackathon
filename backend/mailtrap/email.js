import transporter from './mailtrap.js'

export const resetMail = async (email, url) => {
  const info = await transporter.sendMail({
    from: '"abc@gmail.com',
    to: email,
    subject: "Password Reset Request",
    text: `To reset your password, please click the following link: ${url}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background-color: #f4f4f4; 
            border-radius: 5px; 
          }
          .button {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Click the button below to proceed:</p>
          <a href="${encodeURI(url)}" class="button">Generate Password</a>
          
          <p style="font-size: 0.8em; color: #666;">
            This link will expire in 1 hour for your security.
          </p>
        </div>
      </body>
      </html>
    `
  });
};
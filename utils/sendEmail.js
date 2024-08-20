const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"Authenticatoin App" <auth@ethereal.email>',
    to,
    subject,
    text,
    html: `<b>Hey User!</b><p>${text}</p>`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Message sent: ${info.messageId}`);
};

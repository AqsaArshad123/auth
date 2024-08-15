import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"Authenticatoin App" <auth@ethereal.email>',
    to,
    subject,
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Message sent: ${info.messageId}`);

};

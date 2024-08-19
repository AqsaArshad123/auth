const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports.sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"Authentication App" <auth@ethereal.email>',
    to,
    subject,
    text,
    html: `<b>Hey User!</b><p>${text}</p>`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Message sent: ${info.messageId}`);
};

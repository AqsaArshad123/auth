import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
        user: 'anais.stamm5@ethereal.email',
        pass: 'cVJS5PWGCQeMQneDu4'
    }
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

import nodemailer from 'nodemailer';

export const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'shakil4432@gmail.com',
      pass: 'jojz uoou qeff lfbb',
    },
  });

  await transporter.sendMail({
    from: 'shakil4432@gmail.com', // sender address
    to, // list of receivers
    subject: 'Please change your password within 10 minutes ✔', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });
};

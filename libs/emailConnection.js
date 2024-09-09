import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "notificaciones@oggo.com.co",
      pass: "x8pFrW7mktxQ",
    },
  });

  export default transporter
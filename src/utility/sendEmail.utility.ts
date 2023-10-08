import * as nodemailer from "nodemailer";
import dotenv from "dotenv-flow";

dotenv.config();
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST_NAME,
  port: process.env.EMAIL_HOST_PORT,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASS,
  },
} as nodemailer.TransportOptions);

export const mailSender = async (
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const message = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  return await transport.sendMail(message);
};

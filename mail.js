import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'companyweb14@gmail.com',
    pass: process.env.SMTP_PASS || 'eige noog hnux lgdf',
  },
})

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP Configuration Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

export async function sendMail({ to, subject, text, html }) {
  try {
    console.log('Preparing to send email to:', to);
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Your Company" <companyweb14@gmail.com>',
      to,
      subject,
      text,
      html,
    })
    console.log('MessageId:', info.messageId)
    console.log('SMTP response:', info.response)
    return info
  } catch (error) {
    console.error('Detailed error sending mail:', error)
    throw error
  }
}

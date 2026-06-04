import nodemailer from 'nodemailer'

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  })
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject, 
      text,
    })
  } catch (error) {
    console.error('Email error:', error)
  }
}
export default sendEmail

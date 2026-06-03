import User from '../../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sendEmail from '../../utils/sendEmail.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User Already Exited' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invlaid credientials' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 1000,
    })
    res.status(200).json({
      message: 'Login Successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  const resetToken = user.getResetPasswordToken()
  await user.save()
  const resetUrl = `http://172.20.10.3:5173/reset-password/${resetToken}`
  const message = `You requested a password reset. Click here: ${resetUrl}`

  try {
    await sendEmail(user.email, 'Password Reset', message)
    res.status(200).json({ message: 'Rest link sent to email' })
  } catch (error) {
    console.log('EMAIL ERROR:', error)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    res.status(500).json({ message: 'Email failed' })
  }
}

export const resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  })
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' })
  }

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()
  res.status(200).json({ message: 'Password reset successful' })
}


export const logout = (req,res) =>{
    res.cookies('token', null, {
  httpOnly: true,
  expires: new Date(Date.now()),
})

    res.status(200).json({
        success: true,
        message:'Logged out successfully',
    })
}

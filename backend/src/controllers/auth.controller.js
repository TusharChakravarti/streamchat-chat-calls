import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { upsertStreamUser } from '../lib/stream.js'
import { sendVerificationEmail, sendPasswordResetEmail } from '../lib/email.js'

const issueToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  })
  return token
}

export async function signup(req, res) {
  const { email, password, fullName } = req.body
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists, please use a different one' })
    }

    const idx = Math.floor(Math.random() * 100) + 1
    const randomAvatar = `https://api.dicebear.com/9.x/toon-head/svg?seed=${idx}`


    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
      verificationToken,
      verificationTokenExpiry,
      isVerified: false,
    })


    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || '',
      })
      console.log(`Stream user created for ${newUser.fullName}`)
    } catch (error) {
      console.log('Error creating Stream User', error)
    }

    // Send verification email via Resend
    await sendVerificationEmail(email, fullName, verificationToken)

    res.status(201).json({
      success: true,
      message: 'Account created! Please check your email to verify your account before logging in.',
    })
  } catch (error) {
    console.log('Error in signup controller', error)
    res.status(500).json({ message: 'Internal Server error' })
  }
}



export async function verifyEmail(req, res) {
  const { token } = req.query
  try {
    if (!token) {
      return res.status(400).json({ message: 'Verification token is missing.' })
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() },
    })

    if (!user) {
      return res.status(400).json({ message: 'This verification link is invalid or has expired.' })
    }

    user.isVerified = true
    user.verificationToken = null
    user.verificationTokenExpiry = null
    await user.save()

    // Log them in immediately after verifying
    issueToken(user._id, res)

    res.status(200).json({ success: true, message: 'Email verified successfully!', user })
  } catch (error) {
    console.log('Error in verifyEmail controller', error)
    res.status(500).json({ message: 'Internal Server error' })
  }
}


export async function resendVerification(req, res) {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user || user.isVerified) {
      return res.status(200).json({
        message: 'If that email exists and is unverified, a new link has been sent.',
      })
    }

    const verificationToken = crypto.randomBytes(32).toString('hex')
    user.verificationToken = verificationToken
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    await user.save()

    await sendVerificationEmail(email, user.fullName, verificationToken)
    res.status(200).json({ message: 'A new verification link has been sent to your email.' })
  } catch (error) {
    console.log('Error in resendVerification controller', error)
    res.status(500).json({ message: 'Internal Server error' })
  }
}


export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isPasswordCorrect = await user.matchPassword(password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }


    if (!user.isVerified) {
      return res.status(403).json({
        message: 'Please verify your email before logging in.',
        needsVerification: true,
        email: user.email,
      })
    }

    issueToken(user._id, res)
    res.status(200).json({ success: true, user })
  } catch (err) {
    console.log('Error in login controller', err)
    res.status(500).json({ message: 'Internal Server error' })
  }
}


export  function logout(req,res){
    res.clearCookie('jwt')
    res.status(200).json({succes:true,message:"Logout successfull"})

}

export async function onboard(req, res) {
  try {
    const userId = req.user._id
    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body

    if (!fullName || !nativeLanguage || !learningLanguage) {
      return res.status(400).json({
        message: 'All fields are required',
        missingField: [
          !fullName && 'fullName',
          !bio && 'bio',
          !nativeLanguage && 'nativeLanguage',
          !learningLanguage && 'learningLanguage',
          !location && 'location',
        ].filter(Boolean),
      })
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, isOnboarded: true },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || '',
      })
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`)
    } catch (streamError) {
      console.log('Error updating Stream user during onboarding', streamError.message)
    }

    res.status(200).json({ success: true, user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' })
  }
}

export function googleCallback(req, res) {

  issueToken(req.user._id, res)
  res.redirect(`${process.env.CLIENT_URL}/`)
}


export async function forgotPassword(req, res) {
  const { email } = req.body
  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' })
    }

    const user = await User.findOne({ email })

    // Same response whether user exists or not — prevents email enumeration
    if (!user) {
      return res.status(200).json({
        message: 'If an account with that email exists, a reset link has been sent.',
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    await user.save()

    await sendPasswordResetEmail(email, user.fullName, resetToken)

    res.status(200).json({
      message: 'If an account with that email exists, a reset link has been sent.',
    })
  } catch (error) {
    console.log('Error in forgotPassword controller', error)
    res.status(500).json({ message: 'Internal Server error' })
  }
}

export async function resetPassword(req, res) {
  const { token, newPassword } = req.body
  try {
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required.' })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() },
    })

    if (!user) {
      return res.status(400).json({
        message: 'This reset link is invalid or has expired. Please request a new one.',
      })
    }


    user.password = newPassword
    user.resetPasswordToken = null
    user.resetPasswordExpiry = null
    await user.save()

    res.status(200).json({ success: true, message: 'Password reset successfully! You can now log in.' })
  } catch (error) {
    console.log('Error in resetPassword controller', error)
    res.status(500).json({ message: 'Internal Server error' })
  }
}
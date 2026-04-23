import express from 'express'
import passport from '../lib/passport.js'
import { protectRoute } from '../middleware/auth.middleware.js'
import {
  login,
  logout,
  signup,
  onboard,
  verifyEmail,
  resendVerification,
  googleCallback,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js'

const router = express.Router()


router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get('/verify-email', verifyEmail)                    
router.post('/resend-verification', resendVerification)     


router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)


router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
  }),
  googleCallback
)


router.post('/onboarding', protectRoute, onboard)
router.get('/me', protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user })
})

export default router
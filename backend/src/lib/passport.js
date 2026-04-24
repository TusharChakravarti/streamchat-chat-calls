import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User.js'
import { upsertStreamUser } from './stream.js'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL: 'https://streamchat-chat-calls.onrender.com/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value
        const fullName = profile.displayName
        const profilePic = profile.photos?.[0]?.value
        const googleId = profile.id


        let user = await User.findOne({ googleId })
        if (user) return done(null, user)

        user = await User.findOne({ email })
        if (user) {
          user.googleId = googleId
          user.isVerified = true 
          if (!user.profilePic) user.profilePic = profilePic
          await user.save()
          return done(null, user)
        }


        const idx = Math.floor(Math.random() * 100) + 1
        const randomAvatar = profilePic || `https://api.dicebear.com/9.x/toon-head/svg?seed=${idx}`

        user = await User.create({
          fullName,
          email,
          googleId,
          profilePic: randomAvatar,
          isVerified: true, 
        })

        try {
          await upsertStreamUser({
            id: user._id.toString(),
            name: user.fullName,
            image: user.profilePic || '',
          })
          console.log(`Stream user created for Google user ${user.fullName}`)
        } catch (streamError) {
          console.log('Error creating Stream user for Google OAuth', streamError)
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)

passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

export default passport
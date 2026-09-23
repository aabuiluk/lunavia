const express = require('express')
const router = express.Router()

const pageConfig = {
  welcomeTitle: 'Ready when you are.',
  subtext: 'Log in to pick up where your travel plans left off.',
  enableGoogleAuth: true,
  allowPasswordReset: true,
  bannerText: 'A little less planning. A lot more going.',
}

router.get('/login/config', (req, res) => {
  res.json(pageConfig)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Input all fields.' })
  }

  if (password.length < 6) {
    return res.status(401).json({ message: 'Password must be at least 6 characters.' })
  }

  const rawName = email.split('@')[0]
  const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1)

  return res.json({
    message: 'Successfully!',
    user: {
      email: email,
      name: formattedName,
    },
  })
})

module.exports = router
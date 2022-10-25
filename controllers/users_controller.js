const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

// routes
router.post('/', (req, res) => {
  const {userName, email, password, confirmPassword} = req.body
 
  if (password === confirmPassword) {
      const passwordDigest = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

      User 
          .findByEmail(email) 
          .then(user => {
            if (user) {
              res.json({ error: 'This email is already associated with an account!' })
            } else {
              User 
                .create(userName, email, passwordDigest)
                .then(email => res.json(email))
            }   
      }) 
  } else {
    res.json({ error: 'Password does not match!' })
  }
})

module.exports = router
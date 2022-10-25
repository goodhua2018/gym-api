const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user')

router.get('/', (req, res) => {
  if (req.session.userId) {
    User
    .findById(req.session.userId)
    .then(userName => res.json(userName))
  } else {
    res.json({error: 'no one logged in'})
  }
})

router.post('/', (req, res) => {
  const { email, password } = req.body

  User
    .findByEmail(email)
    .then(user => {
      console.log(user)
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password_digest)
          if (isValidPassword) {
            req.session.userId = user.id
            res.json({id: user.id, name: user.user_name, email: user.email })
          } else {
            res.status(400).json({ error: 'Wrong Password' })
          }
        } else {
          res.status(400).json({ error: 'No such user' })
      }
    })
})

router.delete('/', (req,res) => {
  delete req.session.userId 
  res.json({message: 'delete successful'})
})

module.exports = router
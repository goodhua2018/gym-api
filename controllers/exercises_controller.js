const express = require('express');
const router = express.Router()


const exerciseGifData = require('../exerciseData')

const Exercise = require('../models/exercise')

router.get('/', (req, res) => {
  // console.log( exerciseGifData)
  return res.json({ exerciseGifData })
})

router.get('/:search', (req, res) => {
  const search = req.params.search
  const result = exerciseGifData.filter(item => item.name.includes(search))
  console.log(result)
  return res.json({ result})
}) 

router.get('/:bodyPart/bodyPart',(req, res) => {
  let bodyPart = req.params.bodyPart
  if (/[A-Z]/.test(bodyPart)) {
    bodyPart = bodyPart.slice(0, 5) + ' ' + bodyPart[5].toLowerCase() + bodyPart.slice(6)
    console.log(bodyPart)
  } 
  const result = exerciseGifData.filter(item => item.bodyPart == bodyPart)
  console.log(result)
  return res.json({ result})
})

router.post('/', (req, res) => {
  const {user_email, exercise_id} = req.body
  Exercise
    .create(user_email, exercise_id)
    .then(res => console.log(res))
  
})

router.get('/plans/:loggedInEmail', (req, res) => {
  const email = req.params.loggedInEmail
  Exercise
    .findByEmail(email)
    .then(plans => {
      console.log(plans.map((item) => item.exercise_id))
      return plans.map((item) => item.exercise_id)
    })
    .then(plans => {
      let result = []
      plans.forEach( eachId => {
        exerciseGifData.forEach((exercise) => {
          if (eachId == exercise.id) {
            result.push(exercise)
          }
        })
      })
      console.log(result)
      return res.json({result})
      
    })
})
router.delete('/:id', (req, res) => {
  const exerciseId = req.params.id;

    Exercise
      .delete(exerciseId)
      .then(() => res.json({ message: 'delete'}))
  
})



module.exports = router
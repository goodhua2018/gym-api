const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const logger = require('./middlewares/logger')
const sessions = require('./middlewares/sessions')
const exercisesController = require('./controllers/exercises_controller')
const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')

app.listen (port, () => console.log(`server is listening on port ${port}`))


app.use(logger)
app.use(express.json())
app.use(sessions)

// Routes
app.use('/api/exerciseGifData', exercisesController)

app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)

if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

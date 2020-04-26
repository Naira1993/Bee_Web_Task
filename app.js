const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const authRoute = require('./router/auth')
const workspaceRoute = require('./router/workspace')
const messageRoute = require('./router/message')

const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)


app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/images', express.static('images'));



app.use('/api/auth', authRoute)
app.use('/api/workspace', workspaceRoute)
app.use('/api/message', messageRoute)

module.exports = app
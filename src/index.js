require('dotenv/config')
const express = require('express')
const passport = require('passport')
const pino = require('pino')
const pinoHttp = require('express-pino-logger')

const auth = require('./routes/auth')
const flags = require('./routes/flags')
const experiments = require('./routes/experiments')

const log = pino()

express()
  .use(pinoHttp(log))
  .use(passport.initialize())
  .use('/auth', auth)
  .use('/flags', flags)
  .use('/experiments', experiments)
  .listen(3000, () =>
    log.child({ category: 'application', action: 'started' }).info('server started'))
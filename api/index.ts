import express from 'express'

import AuthController from './auth'

const app = express()

app.use('/auth', AuthController)

app.use(express.json())


export default {
  path: '/api',
  handler: app
}
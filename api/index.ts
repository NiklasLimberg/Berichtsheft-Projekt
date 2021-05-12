import express from 'express'
import cookieParser from 'cookie-parser'

import AuthController from './auth'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/auth', AuthController)

export default {
  path: '/api',
  handler: app
}

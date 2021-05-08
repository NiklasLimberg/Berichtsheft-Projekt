import express from 'express'

import guardMiddleware from './guardMiddleware'

import registerRoute from './register'
import loginRoute from './login'
import tokenRoute from './token'
import meRoute from './me'

const router = express.Router()

router.get('/register', registerRoute)
router.get('/login', loginRoute)

router.use(guardMiddleware)

router.get('/token', tokenRoute)
router.get('/me', meRoute)

export default router

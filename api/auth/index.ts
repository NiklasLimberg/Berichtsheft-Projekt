import express from 'express'

import guardMiddleware from './guardMiddleware'

import registerRoute from './register'
import loginRoute from './login'
import tokenRoute from './token'
import meRoute from './me'
import logoutRoute from './logout'

const router = express.Router()

router.post('/register', registerRoute)
router.post('/login', loginRoute)
router.post('/token', tokenRoute)

router.get('/me', guardMiddleware, meRoute)
router.post('/logout', guardMiddleware, logoutRoute)

export default router

import express from 'express';

const router = express.Router()

import loginRoute from './login';
import tokenRoute from './token';

router.get('/login', loginRoute);
router.get('/token', tokenRoute);


export default router
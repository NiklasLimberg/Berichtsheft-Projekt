import express from 'express'

import { tokenContent } from './types/index'

import { verifyJWT } from './tokenFunctions'

export default async function authenticate (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  const { token } = req.body

  try {
    if (!token) {
      throw new Error('no Token in header')
    }

    const decodedToken: tokenContent = await verifyJWT(token)

    req.userID = decodedToken.userId

    next()
  } catch (error) {
    res.sendStatus(403)
  }
}

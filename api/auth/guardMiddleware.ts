import express from 'express'

import { verifyJWT } from './tokenFunctions'

export default async function authenticate (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  const token = req.cookies['auth._refresh_token.local']

  try {
    if (!token) {
      throw new Error('no Token in header')
    }

    const decodedToken = await verifyJWT(token)

    req.userID = decodedToken.userId

    next()
  } catch (error) {
    debugger
    res.sendStatus(403)
    res.end()
  }
}

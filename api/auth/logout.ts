import express from 'express'

import { PrismaClient } from '@prisma/client'
import { verifyJWT } from './tokenFunctions'

const prisma = new PrismaClient()

export default async function (req: express.Request, res: express.Response): Promise<void> {
  try {
    const refreshToken = req.cookies['auth._refresh_token.local']
    const decodedToken = await verifyJWT(refreshToken)

    await prisma.refreshToken.delete({ where: { tokenId: decodedToken.jti } })
    res.send('success')
  } catch (error) {
    console.error(error)

    res.sendStatus(500)
  }
}

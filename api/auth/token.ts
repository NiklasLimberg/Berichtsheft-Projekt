import express from 'express'

import browser from 'browser-detect'
import { PrismaClient } from '@prisma/client'
import { verifyJWT, generateAccessToken, generateRefreshToken } from './tokenFunctions'

const prisma = new PrismaClient()

export default async function (req: express.Request, res: express.Response) {
  try {
    const refreshToken = req.cookies['auth._refresh_token.local']
    const decodedToken = await verifyJWT(refreshToken)

    const savedToken = await prisma.refreshToken.findUnique({ where: { tokenId: decodedToken.jti }, rejectOnNotFound: true })

    if (decodedToken.userId !== savedToken.userId) {
      throw new Error("refreshToken wasn't issued to this user")
    }

    const detectionResult = browser(req.headers['user-agent'])
    const requestIdentificationString = `Last logged in on ${detectionResult.name}${detectionResult.version} on ${detectionResult.os}`

    if (requestIdentificationString !== savedToken.identificationString) {
      throw new Error("refreshToken wasn't issued to this device")
    }

    const { refreshToken: newRefreshToken, tokenId: newTokenId } = generateRefreshToken(savedToken.userId)

    await prisma.refreshToken.update({ where: { id: savedToken.id }, data: { tokenId: newTokenId } })

    res.json({
      accessToken: generateAccessToken(savedToken.userId),
      refreshToken: newRefreshToken
    })
  } catch (error) {
    console.error(error)

    res.sendStatus(403)
  }
}

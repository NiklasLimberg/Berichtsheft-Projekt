import jwt from 'jsonwebtoken'
import express from 'express'
import browser from 'browser-detect'

import { PrismaClient } from '@prisma/client'
import { v4 as generateUUID } from 'uuid'
import { tokenContent } from './types/index'

const prisma = new PrismaClient()

function generateAccessToken (userId: string): string {
  return jwt.sign({ userId }, 'youraccesstokensecret', { expiresIn: '2min' })
}

function generateRefreshToken (userId: string):{ refreshToken: string, tokenId:string } {
  const tokenId = generateUUID()
  const refreshToken = jwt.sign({ userId } as tokenContent, 'refreshTokenSecret', { jwtid: tokenId })
  return { refreshToken, tokenId }
}

async function generateNewTokenPair (userId: string, req: express.Request): Promise<{ accessToken: string, refreshToken: string }> {
  const accessToken = generateAccessToken(userId)

  const detectionResult = browser(req.headers['user-agent'])

  const { refreshToken, tokenId } = generateRefreshToken(userId)

  // Save the refreshToken to the database
  await prisma.refreshToken.create({
    data: {
      identificationString: `Last logged in on ${detectionResult.name}${detectionResult.version} on ${detectionResult.os}`,
      userId,
      tokenId
    }
  })

  return { accessToken, refreshToken }
}

function verifyJWT (token: string): Promise<tokenContent> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'refreshTokenSecret', (err, decoded) => {
      if (err) {
        return reject(err)
      }

      resolve(decoded as tokenContent)
    })
  })
}

export { generateAccessToken, generateRefreshToken, generateNewTokenPair, verifyJWT }

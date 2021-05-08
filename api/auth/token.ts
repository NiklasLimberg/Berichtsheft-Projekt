import express from 'express'

import { PrismaClient } from '@prisma/client'

import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

export default async function (req: express.Request, res: express.Response):Promise<void> {
  const { token } = req.body

  try {
    // Get the saved refreshToken from the Database
    const refreshToken = await prisma.refreshToken.findUnique({ where: { token }, rejectOnNotFound: true })

    // Check that the refreshToken was issued to this user
    if (req.userID !== refreshToken.userId) {
      throw new Error("Decoded userID and refreshToken userId don't match")
    }

    // Sign and send a new token
    const accessToken = jwt.sign({ userId: refreshToken.userId }, 'accessTokenSecret', { expiresIn: '5min' })

    res.json({
      accessToken
    })
  } catch (error) {
    console.error(error)

    res.sendStatus(403)
  }
}

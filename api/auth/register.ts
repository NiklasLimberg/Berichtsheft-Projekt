import express from 'express'

import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt'
import { generateNewTokenPair } from './tokenFunctions'

const prisma = new PrismaClient()

function generateHash (password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return reject(err)
      }

      resolve(hashedPassword)
    })
  })
}

export default async function (req: express.Request, res: express.Response) {
  try {
    const { email, password, name }: { email: string, password: string, name: string } = req.body

    const hashedPassword = await generateHash(password)

    // Save the refreshToken to the database
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })

    // Generate and send Tokens
    res.json({
      ...await generateNewTokenPair(createdUser.id, req)
    })
  } catch (error) {
    res.statusCode = 400
    res.send('Registration failed')
  }
};

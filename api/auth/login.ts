import express from 'express'

import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { generateNewTokenPair } from './tokenFunctions'

const prisma = new PrismaClient()

export default async function (req: express.Request, res: express.Response) {
  try {
    const { email, password }: { email: string, password: string } = req.body

    // Get the user by id
    const user = await prisma.user.findUnique({ where: { email }, rejectOnNotFound: true })

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return Error(`Incorrect Password for ${user.name}`)
    }

    // Generate and send Tokens
    res.json(await generateNewTokenPair(user.id, req))
  } catch (error) {
    console.error(error)

    res.statusCode = 403
    res.send('Login failed')
  }
};

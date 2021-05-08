import express from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function (req: express.Request, res: express.Response): Promise<void> {
  try {
    // Get the saved user from the Database
    const user = await prisma.user.findUnique({ where: { id: req.userID }, rejectOnNotFound: true })

    res.json({
      id: user.id,
      email: user.email,
      name: user.name
    })
  } catch (error) {
    console.error(error)

    res.sendStatus(500)
  }
}

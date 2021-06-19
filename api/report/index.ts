import express from 'express'

import { PrismaClient, Report } from '.prisma/client'
const prisma = new PrismaClient()

const router = express.Router()

router.get('/:id', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const report = await prisma.report.findUnique({
      where: { id: req.params.id },
      rejectOnNotFound: true
    })

    if (report.userId !== req.userID) {
      throw new Error('Report not found')
    }

    res.json(report)
  } catch (error) {
    res.send(error)
  }
})

router.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { page, limit } = req.params

    const take = Number(limit || 25)
    const skip = Number(page || 1) - 1 * 25

    const [data, total] = await Promise.all([
      prisma.report.findMany({
        where: { userId: req.userID },
        orderBy: { weekStart: 'desc' },
        skip,
        take
      }),
      prisma.report.count({
        where: { userId: req.userID }
      })
    ])

    res.json({ data, total, page, limit })
  } catch (error) {
    res.send(error)
  }
})

router.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const report = req.body as Report

    report.userId = req.userID
    report.weekStart = new Date(report.weekStart)
    report.weekEnd = new Date(report.weekEnd)

    const createdReport = await prisma.report.create({ data: report })

    res.send(createdReport)
  } catch (error) {
    res.send(error.message)
  }
})
router.put('/:id', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const report = req.body as Report
    report.weekStart = new Date(report.weekStart)
    report.weekEnd = new Date(report.weekEnd)

    const updatedReport = await prisma.report.update({
      where: { id: req.params.id },
      data: report
    })

    res.json(updatedReport)
  } catch (error) {
    res.json(error)
  }
})

router.delete('/:id', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    await prisma.report.delete({ where: { id: req.params.id } })
    res.send('success!')
  } catch (error) {
    res.send(error)
  }
})

export default router

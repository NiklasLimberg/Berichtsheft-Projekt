import express from 'express';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const bcrypt = require('bcrypt');

import { generateTokens } from './tokenFunctions';

export default async function (req: express.Request, res: express.Response) {
    try {
        const { email, password }: { email: string, password: string } = req.body;

        // Get the user by id
        const user = await prisma.user.findUnique({ where: { email }, rejectOnNotFound: true });

        const match: boolean = bcrypt.compare(password, user.password);

        if (!match) {
            return Error(`Incorrect Password for ${user.name}`)
        }

        const { accessToken, refreshToken } = await generateTokens(user.id, req)

        res.json({
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(error);

        res.statusCode = 403;
        res.send('Login failed');
    }
};
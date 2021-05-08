import express from 'express';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { generateTokens } from './tokenFunctions'

const bcrypt = require('bcrypt');

async function generateHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err: boolean, hashedPassword: string) => {
            if (err) {
                return reject(err);
            }

            resolve(hashedPassword);
        })
    })
}

export default async function (req: express.Request, res: express.Response) {
    try {
        const { email, password, name }: { email: string, password: string, name: string } = req.body;

        const hashedPassword = await generateHash(password);

        // Save the refreshToken to the database
        const createdUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })

        // Generate and send Tokens
        const { accessToken, refreshToken } = await generateTokens(createdUser.id, req)

        res.send({
            accessToken,
            refreshToken
        })
    } catch (error) {
        console.error(error);

        res.statusCode = 400;
        res.send('Registration failed');
    }
};
import { refreshTokenContent } from './types/index'

import express from 'express';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const browser = require('browser-detect');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


export default async function (req: express.Request, res: express.Response) {
    try {
        const { email, password }: { email: string, password: string } = req.body;

        // Get the user by id
        const user = await prisma.user.findUnique({ where: { email }, rejectOnNotFound: true });

        const match: boolean = await bcrypt.compare(password, user.password);

        if (!match) {
            throw Error(`Incorrect Password for ${user.name}`)
        }

        // Generate an access token and refresh token
        const accessToken = jwt.sign({ userId: user.id, userName: user.name }, 'youraccesstokensecret', { expiresIn: '2min' });
        const refreshToken = jwt.sign({ userId: user.id } as refreshTokenContent, 'refreshTokenSecret');

        // Try to detect the browser
        const detectionResult = browser(req.headers['user-agent']);

        // Save the refreshToken to the database
        await prisma.refreshToken.create({
            data: {
                identificationString: `Last logged in on ${detectionResult.name}${detectionResult.version} on ${detectionResult.os}`,
                token: refreshToken,
                userId: user.id
            }
        })

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
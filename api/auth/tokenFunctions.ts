import { tokenContent } from './types/index'

import express from 'express';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const browser = require('browser-detect');
const jwt = require('jsonwebtoken');

async function generateTokens(userId: string, req: express.Request): Promise<{ accessToken: string, refreshToken: string }> {
    // Generate an access token and refresh token
    const accessToken = jwt.sign({ userId }, 'youraccesstokensecret', { expiresIn: '2min' }) as string;
    const refreshToken = jwt.sign({ userId } as tokenContent, 'refreshTokenSecret') as string;

    // Try to detect the browser
    const detectionResult = browser(req.headers['user-agent']);

    // Save the refreshToken to the database
    await prisma.refreshToken.create({
        data: {
            identificationString: `Last logged in on ${detectionResult.name}${detectionResult.version} on ${detectionResult.os}`,
            token: refreshToken,
            userId: userId
        }
    })

    return { accessToken, refreshToken };
}

async function verifyJWT(token: string): Promise<tokenContent> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'refreshTokenSecret', (err: boolean, decoded: tokenContent) => {
            if (err) {
                return reject(err);
            }

            resolve(decoded);
        })
    })
}


export { generateTokens, verifyJWT }
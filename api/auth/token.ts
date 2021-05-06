import { refreshTokenContent } from './types/index'

import express from 'express';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const jwt = require('jsonwebtoken');

async function verifyJWT(token: string):Promise<refreshTokenContent> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'refreshTokenSecret', (err: boolean, decoded: refreshTokenContent) => {
            if (err) {
                return reject(err);
            }

            resolve(decoded);
        })
    })
}

export default async function (req: express.Request, res: express.Response) {
    const { token } = req.body;

    if (!token) {
        // No Token exists in the body -> 401
        return res.sendStatus(401);
    }

    try {
        // Get the saved refreshToken from the Database
        const tokenPromise = prisma.refreshToken.findUnique({ where: { token }, rejectOnNotFound: true });
        
        // Wait for the verification and the database request
        const [decoded, refreshToken] = await Promise.all([verifyJWT(token), tokenPromise]);

        // Check that the refreshToken was issued to this user
        if (decoded.userId !== refreshToken.userId ) {
            throw new Error("Decoded userID and refreshToken userId don't match");
        }

        // Sign and send a new token
        const accessToken = jwt.sign({ userId: refreshToken?.userId }, 'accessTokenSecret', { expiresIn: '5min' });

        res.json({
            accessToken
        });
    } catch (error) {
        console.error(error);

        res.sendStatus(403);
    }
};
import express from 'express';


export default function timeLog(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('Time: ', Date.now())
    next()
}
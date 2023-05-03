//////////////////     S E R V E R    //////////////////
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { loginSignWithJWT } from './service/AuthService';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
//////////////////       D B      //////////////////
import { createAndConnectClient } from './db/clientConfigAndConnect';
import { Controller } from './controller/WordController';

// for testing purposes only - initiate the controller manually.
let controller: Controller // = new Controller;
export async function initiateApp() {
    await createAndConnectClient();
    controller = new Controller();
}

//////////////////     M I D D L E W A R E     //////////////////
// not in use because there is no action that requires auth.
// signing in will give you a token anyway.
function authenticateTokenMiddleWare(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization'];
    const token = authHeader
    if (token === null) { return res.sendStatus(401) } // no token was sent

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: Error) => {
        if (err) return res.sendStatus(403); // not a valid token
        res.send('auth success!')
        // if we got to this line, the token sent was valid.
        next()
    });
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(authenticateTokenMiddleWare);
app.get('/test', async (req: Request, res: Response) => {

    res.send('Server is LIVE');
});

app.get('/getWord', async (req: Request, res: Response) => {
    const encryptedObject = await controller.getWord();
    res.send(encryptedObject);
});

app.post('/guessWord', async (req: Request, res: Response) => {
    const result = await controller.checkWord(req.body.iv, req.body.encryptedWord, req.body.guess);
    res.send(result); 
});

app.post('/login', (req: Request, res: Response) => {
    const accessToken = loginSignWithJWT(req.body.firstName, req.body.lastName, req.body.email);
    res.json({accessToken: accessToken});
});


export default app;
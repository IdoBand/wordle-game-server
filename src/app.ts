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
import { GameController } from './controller/GameController';
import { log } from 'console';
import { UserController } from './controller/UserController';

// for testing purposes only - initiate the controller manually.
let gameController: GameController // = new Controller;
let userController: UserController
export async function initiateApp() {
    await createAndConnectClient();
    gameController = new GameController();
    userController = new UserController()
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(authenticateTokenMiddleWare);
app.get('/test', async (req: Request, res: Response) => {

    res.send('Server is LIVE');
});

app.get('/getWord', async (req: Request, res: Response) => {
    const encryptedObject = await gameController.getWord();
    res.send(encryptedObject);
});

app.post('/guessWord', async (req: Request, res: Response) => {
    const result = await gameController.checkWord(req.body.iv, req.body.encryptedWord, req.body.guess);
    res.send(result); 
});

app.post('/login', (req: Request, res: Response) => {
    const accessToken = loginSignWithJWT(req.body.firstName, req.body.lastName, req.body.email);
    res.json({accessToken: accessToken});
});

app.post('/user', async (req: Request, res: Response) => {
    const result = await userController.handleUserLogin(req.body)
    res.send(JSON.stringify({
        ...req.body,
        added: result
    }))
})

app.post('/saveGame', async (req: Request, res: Response) => {
    const result = await gameController.saveGame(req.body)
    res.send(JSON.stringify(req.body))
});
app.post('/getUncompletedGame', async (req: Request, res: Response) => {
    const result = await gameController.getUncompletedGame(req.body.userId)
    res.send(JSON.stringify(result))
});
app.post('/deleteGame', async (req: Request, res: Response) => {
    const result = await gameController.deleteGameById(req.body.gameId)
    res.send(JSON.stringify(result))
});
app.get('/getLeaderBoard', async (req: Request, res: Response) => {
    const result = await gameController.getLeaderBoard()
    res.send(JSON.stringify(result))
});

export default app;
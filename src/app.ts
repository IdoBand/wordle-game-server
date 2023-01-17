//////////////////     server    //////////////////
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

//////////////////       DB      //////////////////
import { createAndConnectClient } from './db/clientConfig&Connect';
import { Controller } from './controller/WordController';

let controller: Controller;
export async function initiateApp() {
    await createAndConnectClient();
    controller = new Controller();
};

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getWord', async (req: Request, res: Response) => {
    const encryptedObject = await controller.getWord();
    res.send(encryptedObject);
    });

app.get('/', (req: Request, res: Response) => {
    res.send('test')
});

app.post('/guessWord', async (req: Request, res: Response) => {
    const result = await controller.checkWord(req.body.iv, req.body.encryptedWord, req.body.guess);
    res.send(result); 
});

export default app;
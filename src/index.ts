//////////////////     server    //////////////////
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { cipherWord, decipherWord, getRandomNumber, lettersHeadToHead } from './service';
//////////////////       DB      //////////////////
import client from './db/clientConfig&Connect';
import { createDB } from './db/dbCreation';


// createDB();

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get('/getWord', (req: Request, res: Response) => {
    const tableRandomIndex = getRandomNumber(13);

    const sqlQuery = `SELECT word FROM wordle_5_letters_words where id =${tableRandomIndex}`
    client
        .query(sqlQuery)
        .then(results => results.rows[0])
        .then(row => cipherWord(row.word))
        .then(result => {res.send(result)})
});


app.post('/guessWord', (req: Request, res: Response) => {
    const decrypted = decipherWord(req.body.iv, req.body.encryptedWord);
    const result = lettersHeadToHead(req.body.guess ,decrypted)
    res.send(result);
    // console.log(`this is the result : ${result}`)   
});

app.listen(4000, '0.0.0.0', () => {
    console.log('Server is running at port 4000');
});
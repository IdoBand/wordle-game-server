import { query } from "express"
import client from './clientConfig&Connect'

export async function createDB() {
    // const wordsTableCreationQuery = ` CREATE TABLE IF NOT EXISTS apples (
    //     "id" SERIAL PRIMARY KEY,
    //     "word" VARCHAR(50) NOT NULL
    //     );`
    
    
    // const wordsInsertQuery = `INSERT INTO apples (id, word) VALUES
    //                         (default, 'red'),
    //                         (default, 'green'),  
    //                         (default, 'yellow');`

    const wordsTableCreationQuery = ` CREATE TABLE IF NOT EXISTS wordle_5_letters_words (
    "id" SERIAL PRIMARY KEY,
    "word" VARCHAR(50) NOT NULL
    );`


const wordsInsertQuery = `INSERT INTO wordle_5_letters_words (id, word) VALUES
                        (default, 'POWER'),
                        (default, 'WORLD'),
                        (default, 'PIZZA'),
                        (default, 'BUILD'),
                        (default, 'SUSHI'),
                        (default, 'WIRED'),
                        (default, 'WIERD'),
                        (default, 'HELLO'),
                        (default, 'REACT'),
                        (default, 'ABORT'),
                        (default, 'GLOVE'),
                        (default, 'LEMON'),
                        (default, 'BASIC');`
    try {
 
        // create the table
        await client.query(wordsTableCreationQuery)
        await console.log('Table created successfully!')
        // insert words
        await client.query(wordsInsertQuery)
        console.log('words inserted successfully!')

    }
    catch(error) {
        console.log(error)
    }
   
}

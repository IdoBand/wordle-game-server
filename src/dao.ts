import { Client } from "pg"
import dbClient from './db/clientConfig&Connect';


export class Dao {
    client: Client;
    constructor() {
        this.client = dbClient();
    };

    async getWordFromDB(randomIndex: number){
    
        const sqlQuery = `SELECT word FROM wordle_5_letters_words where id =${randomIndex}`;
        const response = await this.client.query(sqlQuery);
        const row = await response.rows[0];
        return row.word;
    };
};
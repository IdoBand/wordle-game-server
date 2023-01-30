import { Client } from "pg"
import dbClient from '../db/clientConfigAndConnect';

export class Dao {
    client: Client;
    constructor() {
        this.client = dbClient();
    }
    async getWordFromDB(){
        const sqlQuery = 'SELECT word FROM wordle_5_letters_words ORDER BY RANDOM() LIMIT 1;'
        const response = await this.client.query(sqlQuery);
        const row = response.rows[0];
        console.log(row.word)
        return row.word;
    }
}
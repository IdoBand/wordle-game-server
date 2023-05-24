import { Client } from "pg"
import dbClient from '../db/clientConfigAndConnect';
export class UserDao {
    client: Client;
    constructor() {
        this.client = dbClient();
    }

    async handleUserLogin(userObject) {
        const sqlQuery = `INSERT INTO wordle_user ("userId", "userName") VALUES
        ('${userObject.email}', '${userObject.name}');`
        console.log(sqlQuery)
        try {
            const response = await this.client.query(sqlQuery);
            console.log(response)
            const result = response.rowCount === 1 ? true : false
            return result
        } catch (err) {
            console.log(err)
            return false
        }
   
    }
    async deleteAUser(userId) {
        const sqlQuery = `DELETE FROM wordle_user WHERE "userId" = ${userId};`
        try {
            const response = await this.client.query(sqlQuery);
        } catch (err) {
            console.log(err)
        }
    }
}
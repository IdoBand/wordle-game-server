import { Client } from "pg"
import dbClient from '../db/clientConfigAndConnect';
import { GameObject } from "src/interface";

export class GameDao {
    client: Client;
    constructor() {
        this.client = dbClient();
    }
    async getWordFromDB(){
        const sqlQuery = 'SELECT word FROM wordle_5_letters_words ORDER BY RANDOM() LIMIT 1;'
        const response = await this.client.query(sqlQuery);
        const row = response.rows[0];
        console.log('----------------- '  + row.word)
        return row.word;
    }
    async checkIfGameExists(gameId: string) {
        const sqlQuery = `
                SELECT "gameId"
                FROM wordle_game
                WHERE "gameId" = $1
        `
        try {
            const response = await this.client.query(sqlQuery, [gameId])
            const doesGameExist = response.rows.length === 1 ? true : false
            return doesGameExist
        } catch (err) {
            console.log(err)
            return false
        } 
    }
    async saveNewGame(gameObject: GameObject) {
        let sqlQuery: string
        try {
            sqlQuery = `
            INSERT INTO wordle_game 
            ("gameId", "userId", "currentTile", "currentRowFirstTile", "totalAttempts", completed, win, score, "wordToGuess", "tilesContent", "tilesClassNames") 
            VALUES
            ($1, $2, $3::integer, $4::integer, $5::integer, $6, $7, $8::integer, $9, $10, $11)
            ;`

            const values = [
                gameObject.gameId,
                gameObject.userId,
                gameObject.currentTile,
                gameObject.currentRowFirstTile,
                gameObject.totalAttempts,
                gameObject.completed,
                gameObject.win,
                gameObject.score,
                gameObject.wordToGuess,
                gameObject.tilesContent,
                gameObject.tilesClassNames,
            ]
            const response = await this.client.query(sqlQuery, values)
        } catch (err) {
            console.log(err)
            return false
        } 
    }
    async saveExistingGame(gameObject: GameObject) {
        const sqlQuery = `
            UPDATE wordle_game
                SET
                "currentTile" = $3::integer,
                "currentRowFirstTile" = $4::integer,
                "totalAttempts" = $5::integer,
                completed = $6,
                win = $7,
                score = $8::integer,
                "wordToGuess" = $9,
                "tilesContent" = $10,
                "tilesClassNames" = $11
            WHERE
                "gameId" = $1 
                    AND
                "userId" = $2
        `
        const values = [
            gameObject.gameId,
            gameObject.userId,
            gameObject.currentTile,
            gameObject.currentRowFirstTile,
            gameObject.totalAttempts,
            gameObject.completed,
            gameObject.win,
            gameObject.score,
            gameObject.wordToGuess,
            gameObject.tilesContent,
            gameObject.tilesClassNames,
        ]
        try {
            const response = await this.client.query(sqlQuery, values)
        } catch (err) {
            console.log(err)
            return false
        }
    }
    async deleteGameById(gameId: string) {
        const sqlQuery = `
            DELETE FROM wordle_game
            WHERE "gameId" = $1
        `
        try {
            const response = await this.client.query(sqlQuery, [gameId])
        } catch (err) {
            console.log(err)
        }
    }
    async getUncompletedGame(userId: string) {
        const sqlQuery = `
            SELECT 
            *
            FROM
                wordle_game
            WHERE 
                completed = false
            AND
                "userId" = $1
        `
        try {
            const response = await this.client.query(sqlQuery, [userId])
            if (response.rows.length) {
                return {
                    isGame: true,
                    game: response.rows[0]
                }
            }
            return {
                isGame: false
            }
        } catch (err) {
            console.log(err)
        }
    }
    async getLeaderBoard() {
        const sqlQuery = `
            SELECT games."userId", SUM(games.score), users."userName"
            FROM wordle_game AS games
            FULL JOIN wordle_user AS users
            ON games."userId" = users."userId"
            GROUP BY games."userId", users."userName"
            ORDER BY SUM(games.score) DESC
            LIMIT 10;`
        try {
            const response = await this.client.query(sqlQuery)
            if (response.rows.length) {
                return response.rows
            }
        } catch (err) {
            console.log(err)
        }
    }
}


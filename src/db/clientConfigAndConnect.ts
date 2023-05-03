import { Client } from 'pg';
import dotenv from 'dotenv'
dotenv.config()

let client: Client;
export async function createAndConnectClient() {
    const defaultClient = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASS,
        port: +process.env.POSTGRES_PORT,
        ssl: true
    });
    console.log('pg client created')
    try {
        await defaultClient.connect()
        console.log('client has established a connection to pg');
        client = defaultClient;
    } catch(e) {
        console.log('client was unable to connect to pg', e.toString());

    }
}

export default function dbClient(): Client {
    if (!client) { throw new Error('you must connect before trying to use client')}
    return client;
}
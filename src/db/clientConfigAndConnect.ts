import { Client } from 'pg';

let client: Client;
export async function createAndConnectClient() {
    const defaultClient = new Client({
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASS,
        user: process.env.POSTGRES_USER,});
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
import { Pool } from 'pg';
const client = new Pool({
                                    host: 'localhost',
                                    password: '',
                                    user: 'postgres',});


console.log('pg client created')
client.connect()
.then(()=> {
    console.log('client has established a connection to pg')
})
.catch((e)=> {
    console.log('client was unable to connect to pg', e.toString());
        process.exit(1);
});

export default client;
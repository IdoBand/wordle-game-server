IMPORTANT ! ! !

1. This server is meant to work with PostgresSQL DB. In order for the server to work properly please make sure to edit the <code>client</code> variable inside <code>clientConfig&Connect.ts</code>    in a way that it will correspond with your local Postgres client.\n
<code>clientConfig&Connect.ts</code> is located at -----> <code>src/db/clientConfig&Connect.ts.</code>

2. inside <code>index.ts</code> theres a function call at line 11 >>> <code>createDB()</code>. 
   if client was configed properly, it should create the DB. make sure to comment it out after running 
   the server for the first time.

3.  to run server -----> <code>npm start</code>.

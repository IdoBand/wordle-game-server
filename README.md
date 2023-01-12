IMPORTANT ! ! !

1. This server is meant to work with PostgresSQL DB. In order for the server to work properly please make sure to edit the client variable inside clientConfig&Connect.ts    in a way that it will correspond with your local Postgres client. clientConfig&Connect.ts is located at ---> src/db/clientConfig&Connect.ts.

2. inside index.ts theres a function call at line 11 >>> createDB(). if client was configed properly, it should create the DB. make sure to comment it out after running    the server for the first time.

3.  to run server ---> npm start

import app, {initiateApp} from './app'
import { createDB } from './db/dbCreation';
// this module is not testable !
async function main() {
    // create Client, connect to DB, initiate controller
    await initiateApp();

    // COMMENT OUT createDB() AFTER FIRST RUN TO AVOID RUNNING UNNECESSARY QUERIES ! ! !
    // createDB();

    app.listen(4000, '0.0.0.0', () => {
        console.log('Server is running at port 4000');
    });
};

main().catch(console.log);
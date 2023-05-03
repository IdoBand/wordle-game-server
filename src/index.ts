import app, {initiateApp} from './app'
import { createDB } from './db/dbCreation';
// this module is not testable !
async function main() {
    // create Client, connect to DB, initiate controller
    await initiateApp();
    
    // COMMENT OUT createDB() AFTER FIRST RUN TO AVOID RUNNING UNNECESSARY QUERIES ! ! !
    // createDB();
    
    const port = 443;
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server is running at port ${port}`);
    });
}

main().catch(console.log);
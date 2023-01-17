import { ImportMock } from "ts-mock-imports";
import * as clientConfigConnectModule from './db/clientConfig&Connect';

const mockClient: {query: unknown} = {query: null}
ImportMock.mockFunction(clientConfigConnectModule, 'default', mockClient);

import app from './app'
import request from 'supertest'
import { expect } from "chai";

// integration test (E2E)
// not working at the moment
describe('test 1 2 3', () => {
    it('tttttttttttttt', async (done) => {
    mockClient.query = () => Promise.resolve({});
    return request(app)
        .get('/getWord')
        .expect(200)
        .expect({})
        done()
        // .catch(()=> {
        //     console.log('rejected')
        //     done()
        // }) ;
    });
    
});
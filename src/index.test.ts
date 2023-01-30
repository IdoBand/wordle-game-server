import { ImportMock } from "ts-mock-imports";
import * as clientConfigConnectModule from './db/clientConfigAndConnect';
import {cipherObject} from './assets/interface'
const mockClient: {query: unknown} = {query: null}
ImportMock.mockFunction(clientConfigConnectModule, 'default', mockClient);
let x: cipherObject;
import app from './app'
import request from 'supertest'
import { expect } from "chai";

describe('/getWord', () => {
    beforeEach(() => {
        mockClient.query = () => Promise.resolve({rows: [{word: 'POWER'}]});
    })
    it('returned object should have property "encrypted" with value of type string', () => {
        return request(app)
            .get('/getWord')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('encrypted');
                expect(res.body.encrypted).to.be.a('string');
            });
    });
    it('returned object should have property "iv" which contains properties "data" and "type"', () => {
        return request(app)
            .get('/getWord')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('iv');
                expect(res.body.iv).to.have.property('data');
                expect(res.body.iv).to.have.property('type');
            });
    });
    it('returned object should have property "iv" containing the Initiation Vector of length 16', () => {
        return request(app)
            .get('/getWord')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('iv');
                expect(res.body.iv.data).to.have.length(16);
            });
        });

    it('returned object should have property "iv" with value "type": "Buffer"', () => {
        return request(app)
            .get('/getWord')
            .expect(200)
            .then(res => {
                expect(res.body.iv.type).to.equal('Buffer');
            });
        });
        // it('encc', () => {
        //     return request(app)
        //         .get('/getWord')
        //         .expect(200)
        //         .then(res => {
        //             console.log(res.body)
        //             expect(typeof res.body).to.equal('EncryptedObject');
        //         });
        //     });
});

const guessBodyRequest = { guess: 'HELLO',
encryptedWord: '81ada814122ec4ace1d58cc56d68769f',
  iv: [
      110,
      235,
      204,
      169,
      193,
      181,
      225,
      65,
      197,
      38,
      215,
      204,
      144,
      26,
      28,
      196
    ]
}
describe('/guessWord', () => {

    it('should return an array of length 5', () => {
        return request(app)
            .post('/guessWord')
            .send(guessBodyRequest)
            .expect(200)
            .then(res => {
                expect(res.body).to.have.length(5);
            });
    
    });
    it('each sub array should be length of 2 and contain 2 strings', () => {
        return request(app)
            .post('/guessWord')
            .send(guessBodyRequest)
            .expect(200)
            .then(res => {
                expect(res.body[0][0]).to.be.a('string');
                expect(res.body[0][1]).to.be.a('string');
            });
    });
   
});
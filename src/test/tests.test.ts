import { describe } from "node:test";
import { expect } from "chai";
import {cipherWord, decipherWord, lettersHeadToHead} from '../service'

describe('lettersHeadToHead', () => {
    it("should return 5 'tile bull' for 'HELLO' vs 'HELLO'", () => {
        const result = lettersHeadToHead('HELLO', 'HELLO')
        
        expect(result).to.deep.equals([
            [ 'H', 'tile-bull' ],
            [ 'E', 'tile-bull' ],
            [ 'L', 'tile-bull' ],
            [ 'L', 'tile-bull' ],
            [ 'O', 'tile-bull' ]
          ]);
    })

    it("should return 1 'tile', 1 'tile-cow', 1 'tile', 1 'tile-cow', 1 'tile' for 'POWER' vs 'HELLO'", () => {
        
        expect(lettersHeadToHead('POWER', 'HELLO')).to.deep.equals([
            [ 'P', 'tile' ],
            [ 'O', 'tile-cow' ],
            [ 'W', 'tile' ],
            [ 'E', 'tile-cow' ],
            [ 'R', 'tile' ]
          ]);
    })

    it("should return 5 'tile' for 'GLOVE' vs 'SUSHI'", () => {
        
        expect(lettersHeadToHead('GLOVE', 'SUSHI')).to.deep.equals([
            [ 'G', 'tile' ],
            [ 'L', 'tile' ],
            [ 'O', 'tile' ],
            [ 'V', 'tile' ],
            [ 'E', 'tile' ]
          ]);
    })
});

describe('decipherWord', () => {
    it("should return string 'ABORT'", () => {
        const iVector = [
            229, 194, 175,  51, 196,
             65, 237, 231,  44,  69,
             96,  70, 111, 163, 138,
             45
          ];
        const encryptedWord = 'b37e39ca4f5b353053f28cb753359bae';
        expect(decipherWord(iVector, encryptedWord)).to.equal('ABORT');
        
    });

    it("should throw Error due to tempering with iVector", () => {
        try {
            const iVector = [
                229, 194, 175,  51, 196,
                 65, 237, 231,  44,  53,
                 96,  70, 111, 163, 138,
                 45
              ];
            const encryptedWord = 'b37e39ca4f5b353053f28cb753359bae';
            const result = decipherWord(iVector, encryptedWord);
            expect(result).to.throws();
        } catch (e){
            expect(e.toString()).to.equals("Error: error:1C800064:Provider routines::bad decrypt")
        }
    });

    it("should throw Error due to tempering with encryptedWord", () => {
        const iVector = [
            229, 194, 175,  51, 196,
             65, 237, 231,  44,  69,
             96,  70, 111, 163, 138,
             45
          ];
        const encryptedWord = 'a37e39ca4f5b353053f28cb753359bae';
        const result = () => decipherWord(iVector, encryptedWord);
        expect(result).to.throws();
    });

});


//////    NOT FINISHED!!!!!!!    /////
// describe('cipherWord', () => {
//     it("should return object", () => {
//         const result = () => cipherWord('')
//         expect(result).to.equal('');
        
//     });


// });
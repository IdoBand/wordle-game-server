import crypto, { createDecipheriv } from 'crypto';
import { Dao } from '../dao/WordDao'
import { cipherObject } from 'src/assets/interface';

export class Service {

    dao: Dao;
    constructor() {
        this.dao = new Dao();
    }

    async getWordFromDao() {
        return await this.dao.getWordFromDB();
    }

    cipherWord(word: string) {
  
        const iv = crypto.randomBytes(16);
        const message: string = word;
        const key = '12345678123456781234567812345678';
    
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(message, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        
        const cipherObject: cipherObject = {
            iv,
            encrypted
            };
        return cipherObject
    }
    
    decipherWord(iVector: number[], encryptedWord: string) {
    
        const key = '12345678123456781234567812345678';
        const iv = Buffer.from(iVector);
      
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
        let decrypted = decipher.update(encryptedWord,  'hex', 'utf-8')
        decrypted += decipher.final('utf-8');
    
        return decrypted;
    }
    
    lettersHeadToHead(userGuess: string, realWord: string): Array<[]> {
    
        const classNamesResultArray = [];
        for (let i = 0 ; i <= 4; i++) {
      
            const letter = userGuess[i];
            if (userGuess[i] === realWord[i]) {
                classNamesResultArray.push([letter, 'tile-bull']);
            } else if (realWord.includes(letter)) {
                classNamesResultArray.push([letter, 'tile-cow']);
            } else {
                classNamesResultArray.push([letter, 'tile']);
            }
        }
        return classNamesResultArray;
    }
}

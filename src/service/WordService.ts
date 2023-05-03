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
        const occurrences = this.lettersCountMap(realWord)
        const classNamesResultArray = [];
        for (let i = 0 ; i < 5; i++) {
            const userLetter = userGuess[i];
            const realLetter = realWord[i]
            if (userLetter === realLetter) {
                classNamesResultArray.push([userLetter, 'bg-bull']);
                const indices = occurrences.get(userLetter)
                indices.count -= 1
                occurrences.set(userLetter, indices)
                for (let j = 0 ; j <= i; j++) {
                    if (classNamesResultArray[j][1] === 'bg-cow' && 
                    (occurrences.get(userLetter).indexes.includes(i)) &&
                    classNamesResultArray[j][0] === userLetter) {

                        classNamesResultArray[j][1] = 'tile'
                    }
                }
               
            } else if (realWord.includes(userLetter) &&
                occurrences.get(userLetter).count > 0 && 
                occurrences.get(userLetter).cow < occurrences.get(userLetter).count) {
                    classNamesResultArray.push([userLetter, 'bg-cow']);
                    const indices = occurrences.get(userLetter)
                    indices.cow += 1
                    occurrences.set(userLetter, indices)
            } else {
                classNamesResultArray.push([userLetter, 'tile']);
            }
        }
        return classNamesResultArray;
    }
    lettersCountMap (word: string): Map<string, any>{
        const occurrences = new Map()
        for (let i = 0 ; i < 5; i++) {
            let letter = word[i]
            if (!occurrences.get(letter)) {
                occurrences.set(letter, {indexes: [i], count: 1, cow: 0})
            } else {
                const indices = occurrences.get(letter);
                indices.indexes.append[i]
                indices.count += 1
                occurrences.set(letter, indices);
            }
        }
        
        return occurrences
    }

}

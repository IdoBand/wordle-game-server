import crypto, { createDecipheriv } from 'crypto';
import { GameDao } from '../dao/GameDao'
import { cipherObject } from 'src/assets/interface';
import { GameObject } from 'src/interface';

export class GameService {

    dao: GameDao;
    constructor() {
        this.dao = new GameDao();
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
            if (userLetter === realLetter) {                               // guess letter is bullseye
                classNamesResultArray.push([userLetter, 'bg-bull']);
                const indices = occurrences.get(userLetter)
                indices.count -= 1
                occurrences.set(userLetter, indices)
                for (let j = 0 ; j <= i; j++) {
                    if (classNamesResultArray[j][1] === 'bg-cow' && 
                    (occurrences.get(userLetter).indexes.includes(i)) &&
                    classNamesResultArray[j][0] === userLetter) {

                        classNamesResultArray[j][1] = 'bg-dark'
                    }
                }
               
            } else if (realWord.includes(userLetter) &&    // guess letter exists but idx is not correct
                occurrences.get(userLetter).count > 0 && 
                occurrences.get(userLetter).cow < occurrences.get(userLetter).count) {
                    classNamesResultArray.push([userLetter, 'bg-cow']);
                    const indices = occurrences.get(userLetter)
                    indices.cow += 1
                    occurrences.set(userLetter, indices)
            } else {                                                     // guess letter exists but idx is not correct
                classNamesResultArray.push([userLetter, 'bg-dark']);
            }
        }
        return classNamesResultArray;
    }
    lettersCountMap (word: string): Map<string, any> {
        const occurrences = new Map()
        for (let i = 0 ; i < 5; i++) {
            let letter = word[i]
            if (!occurrences.get(letter)) {
                occurrences.set(letter, {indexes: [i], count: 1, cow: 0})
            } else {
                const indices = occurrences.get(letter);
                indices.indexes.push[i]
                indices.count += 1
                occurrences.set(letter, indices);
            }
        }
        return occurrences
    }
    async saveGame(gameObject) {
        const modifiedGameObject: GameObject = {
            ...gameObject,
            wordToGuess: this.decipherWord(gameObject.wordToGuess.iv ,gameObject.wordToGuess.encrypted)
  
        }

        
        const ifGameIdExists = await this.dao.checkIfGameExists(modifiedGameObject.gameId)
        if (ifGameIdExists) {
            const result = await this.dao.saveExistingGame(modifiedGameObject)
        } else {
            const result = await this.dao.saveNewGame(modifiedGameObject)
        }
    }
    async getUncompletedGame(userId: string) {
        const response = await this.dao.getUncompletedGame(userId)
        if (response.isGame) {

            response.game.wordToGuess = this.cipherWord(response.game.wordToGuess)
        }
        return response
    }
    async deleteGameById(gameId: string) {
        return await this.dao.deleteGameById(gameId)
    }
    async getLeaderBoard() {
        return await this.dao.getLeaderBoard()
    }
}

import { Service } from '../service/WordService'

export class Controller {
    service: Service
    constructor() {
        this.service = new Service();
    }

    async getWord() {
        const word = await this.service.getWordFromDao();
        return this.service.cipherWord(word);
        }

    async checkWord(iv: number[], encryptedWord: string, guess: string){
        const decryptedWord = this.service.decipherWord(iv, encryptedWord);
        const result = this.service.lettersHeadToHead(guess, decryptedWord);
        return result;
    }
}
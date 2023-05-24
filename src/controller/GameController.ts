import { GameService } from '../service/GameService'

export class GameController {
    service: GameService
    constructor() {
        this.service = new GameService();
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
    async saveGame(gameObject) {
        const result = await this.service.saveGame(gameObject)
    }
    async getUncompletedGame(userId: string) {
        return await this.service.getUncompletedGame(userId)
    }
    async deleteGameById(gameId: string) {
        return await this.service.deleteGameById(gameId)
    }
    async getLeaderBoard() {
        return await this.service.getLeaderBoard()
    }
}
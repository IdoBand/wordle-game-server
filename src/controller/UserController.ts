import { UserService } from '../service/UserService'

export class UserController {
    service: UserService
    constructor() {
        this.service = new UserService();
    }
    async handleUserLogin(userObject){
        const result = await this.service.handleUserLogin(userObject)
        return result
    }
}
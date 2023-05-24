import { UserDao } from '../dao/UserDao'

export class UserService {
    dao: UserDao;
    constructor() {
        this.dao = new UserDao();
    }
    async handleUserLogin(userObject){
        const result = await this.dao.handleUserLogin(userObject)
        return result
    }
}
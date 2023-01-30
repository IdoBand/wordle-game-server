import jwt, { JwtPayload } from 'jsonwebtoken';

export function loginSignWithJWT(firstName: string, lastName: string, email: string) {
    const someUser = { firstName: firstName,
        lastName: lastName,
           email: email
            }
    return jwt.sign(someUser, process.env.ACCESS_TOKEN_SECRET);
}
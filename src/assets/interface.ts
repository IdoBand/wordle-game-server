export interface cipherObject {
    iv: Buffer,
    encrypted: string;
}

export interface User {
    firstName: string,
    lastName?: string,
    email?: string
}


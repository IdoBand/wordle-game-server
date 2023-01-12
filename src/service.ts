import  crypto, { createDecipheriv }  from 'crypto';

export function getRandomNumber(tableSize: number): number {
    return Math.max(1, Math.floor(Math.random() * tableSize));
}; 

interface cipherObject {
    iv: {
        method: string;
        vector: number[];
    };
    key: string;
    encrypted: string;
};


export function cipherWord(word: string) {
    console.log(word)
    let iv = crypto.randomBytes(16);
    let message: string = word;
    let key: string = '12345678123456781234567812345678';

    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(message, 'utf-8', 'hex')
    encrypted += cipher.final('hex');
    
    let cipherObject = {
        iv,
        encrypted
        };
    return cipherObject
};

export function decipherWord(iVector: number[], encryptedWord: string) {

    const key = '12345678123456781234567812345678';
    const iv = Buffer.from(iVector);
  
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encryptedWord,  'hex', 'utf-8')
    decrypted += decipher.final('utf-8');

    return decrypted;
};

export function lettersHeadToHead(userGuess: string, realWord: string) {

    let classNameResult = [];
    for (let i = 0 ; i <= 4; i++) {
  
        let letter = userGuess[i];
        if (userGuess[i] === realWord[i]) {
            classNameResult.push([letter, 'tile-bull']);
        } else if (realWord.includes(letter)) {
            classNameResult.push([letter, 'tile-cow']);
        } else {
            classNameResult.push([letter, 'tile']);
        } 
    };


    return classNameResult
};


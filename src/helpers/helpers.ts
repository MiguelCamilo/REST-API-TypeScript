// creating authentication helpers to encrypt passwords or to creata random token
import crypto from 'crypto';

const SECRET = process.env.SECRET

export const authentication = (salt: string, password: string): string => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

// generates a random string of characters, using the Node.js built-in crypto module
export const random = () => crypto.randomBytes(128).toString('base64')

// The crypto.randomBytes(128) function generates a 128-byte (or 1024-bit) string of random data, which is then encoded as a base64 string using the toString('base64') method.

// The random function is exported, so it can be used in other parts of the code.
// The salt constant is assigned the result of calling the random function. This is typically used to add an extra layer of randomness to a password or other sensitive data, making it harder for attackers to crack.
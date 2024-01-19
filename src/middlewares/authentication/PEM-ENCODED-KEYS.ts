import { generateKeyPairSync } from 'crypto';
import fs from 'fs';
// Generate a key pair to be used to work with the RS256 Algorithm
// const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//   modulusLength: 2048,
//   publicKeyEncoding: { type: 'spki', format: 'pem' },
//   privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
// });

// Private Key: A secret key used in asymmetric cryptography. It must be securely stored and is used to generate digital signatures and decrypt data.
// used to sign Json web tokens
const privateKey = fs.readFileSync(`${__dirname}/../../keys/private_key.pem`, {
  encoding: 'utf8',
});

// Public Key: A key derived from the private key, meant for distribution. It's used to verify digital signatures and encrypt data that only the private key holder can decrypt.
// used to verify Json web tokens
const publicKey = fs.readFileSync(`${__dirname}/../../keys/public_key.pem`, {
  encoding: 'utf8',
});

export { publicKey as PUB_KEY, privateKey as PRIV_KEY };

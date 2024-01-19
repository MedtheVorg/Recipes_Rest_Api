import { generateKeyPairSync } from 'crypto';
import fs from 'fs';

/**
 * uncomment this function to generate and store RS256 algorithm key pairs
 * in the keys folder
 */
// const { privateKey, publicKey } = generateKeyPairSync('rsa', {
//   modulusLength: 2048,
//   publicKeyEncoding: { type: 'spki', format: 'pem' },
//   privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
// });
// fs.writeFileSync(`${__dirname}/../../keys/private_key.pem`, privateKey, {
//   encoding: 'utf8',
// });
// fs.writeFileSync(`${__dirname}/../../keys/public_key.pem`, publicKey, {
//   encoding: 'utf8',
// });

// Private Key: A secret key used in asymmetric cryptography. It must be securely stored and is used to generate digital signatures and decrypt data.
// used to sign Json web tokens
const PRIV_KEY = fs.readFileSync(`${__dirname}/../../keys/private_key.pem`, {
  encoding: 'utf8',
});

// Public Key: A key derived from the private key, meant for distribution. It's used to verify digital signatures and encrypt data that only the private key holder can decrypt.
// used to verify Json web tokens
const PUB_KEY = fs.readFileSync(`${__dirname}/../../keys/public_key.pem`, {
  encoding: 'utf8',
});

export { PUB_KEY, PRIV_KEY };

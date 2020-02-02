const crypto = require('crypto');
const { cryptKey } = require('../../config/config'); // 24 Digit Secret Key

class Crypto {
  // Triple DES encryption.
  encryptData(data) {
    const encrypt = crypto.createCipheriv('des-ede3', cryptKey, '');
    let theCipher = encrypt.update(data, 'utf8', 'base64');
    theCipher += encrypt.final('base64');
    return theCipher;
  }

  // Triple DES decryption.
  decryptData(encryptedData) {
    const decrypt = crypto.createDecipheriv('des-ede3', cryptKey, '');
    const str = decrypt.update(encryptedData, 'base64', 'utf8');
    return (str + decrypt.final('utf8'));
  }
}
module.exports = new Crypto();

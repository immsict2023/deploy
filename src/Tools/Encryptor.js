import * as CryptoJs from 'crypto-js';
import config from '../Component/Security/config';

class Encryptor {

  static encryptInformation = (data) => {
    try {
      return CryptoJs.AES.encrypt(JSON.stringify(data), config.encryptKey).toString().replaceAll('/','Por21Ld');
    } catch(err) {
      console.log(err)
    }
  }

  static decryptInformation = (data) => {
    const decrypted = CryptoJs.AES.decrypt(data.toString().replaceAll('Por21Ld','/'), config.encryptKey);
    if (decrypted) {
      try {
        const str = decrypted.toString(CryptoJs.enc.Utf8);
        if (str.length > 0) {
          return str;
        } else {
          return 'error 1';
        } 
      } catch (e) {
        return 'error 2';
      }
    }
    return 'error 3';
  };
}

export default Encryptor;
import { AppConstant } from './Constants';
import * as cryptoJS from 'crypto-js';

export class EncryptionFunctions {
  
  public static ENCRYPT_OBJ(value: any): any {
    return cryptoJS.AES.encrypt(JSON.stringify(value), AppConstant.ENCRYPTION_TOKEN);
  }
  
  public static DECRYPT_OBJ(value: any): any {
    if (value && value != null) {
      const bytes = cryptoJS.AES.decrypt(value.toString(), AppConstant.ENCRYPTION_TOKEN);
      const decryptedData = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
      return decryptedData;
    }
    return '';
  }
}


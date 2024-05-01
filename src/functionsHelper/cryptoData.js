import CryptoJS from 'crypto-js';
import {PERSIST_CONFIG} from '../constants';
const encryptData = (key, data)=>{
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), PERSIST_CONFIG.secretKey).toString();
    localStorage.setItem(key, ciphertext);
}
const decryptData = (key)=>{
    const data = localStorage.getItem(key);
    if(data){
        var bytes  = CryptoJS.AES.decrypt(data, PERSIST_CONFIG.secretKey);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
    return data ? decryptedData : null;
}

export {
    encryptData,
    decryptData
}
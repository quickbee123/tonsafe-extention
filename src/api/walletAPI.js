import storage from './storageAPI';
const CryptoJS = require("crypto-js");

const wallet={

    async isPasswordSet() {
      if(!storage.get('masterPassword'))
        return true;
      
      return false;  
    },
    async setPassword(pass) {
      const seed = CryptoJS.lib.WordArray(16).toString();
      const hashedpass = CryptoJS.SHA512(pass+seed);
      const value ={
          'hashedpass': hashedpass,
          'seed'      : seed
      };
      storage.set('masterPassword',value);

    },
    async checkPassword(pass) {
        const storedPass = storage.get('masterPassword');
        const seed = storedPass.seed;
        const hashedpass = CryptoJS.SHA512(pass+seed);
        
        if(storedPass===hashedpass)
        return true;

        return false;
  
    }


};

export default wallet;
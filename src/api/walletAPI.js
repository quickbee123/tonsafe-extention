import storage from './storageAPI';
const CryptoJS = require("crypto-js");

const wallet={

    async isPasswordSet() {
      
      var db = await storage.getDb();
      const password = await db.get('options', 'MasterPassword');

      return password ? true : false; 
    },
    async setPassword(pass) {
      var db = await storage.getDb();
      
      const seed = CryptoJS.lib.WordArray.random(16).toString();
      const hashedpass = CryptoJS.SHA512(pass+seed).toString();
      const obj ={'hashedPassword': hashedpass,'seed': seed};

      await db.put('options', {name:'MasterPassword',value:obj});

    },
    async checkPassword(pass) {
        var db = await storage.getDb();
        const storedPassword = await db.get('options', 'MasterPassword');

        const seed = storedPassword.value.seed;

        const inputHashedPass = CryptoJS.SHA512(pass+seed).toString();
        
        if(storedPassword.value.hashedPassword===inputHashedPass)
        return true;

        return false;
  
    },
    async fetchWallets(){
      var db = await storage.getDb();
      return await db.getAll('wallets');
    }


};

export default wallet;
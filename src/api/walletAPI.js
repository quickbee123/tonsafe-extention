import storage from './storageAPI';
import tonAPI from './tonAPI'
import network from './networkAPI'
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
    },
    async getNewSeed(){
      
      const server = network[0].server;
      const seed = await tonAPI.generateSeed(server);
      console.log(seed);
      return seed;

    },
    async createNewWallet(seed,password){
      
      const server = network[0].server;
      const keys = await tonAPI.convertSeedToKeys(server,seed);
      const address = await tonAPI.getFutureAddress(server,keys);
      var db = await storage.getDb();

      var enc_key = CryptoJS.AES.encrypt(JSON.stringify(keys.secret),password).toString(); 

      const wallet ={
        address: address,
        keys:{
          public:keys.public,
          secret:enc_key
        }
      };
      await db.put('wallets',wallet);

      return wallet;

    },
    async decryptSecretKey(enc_key,password){
      var dec_key = CryptoJS.AES.decrypt(enc_key,password);  
      return dec_key.toString(CryptoJS.enc.Utf8); 
    }


};

export default wallet;
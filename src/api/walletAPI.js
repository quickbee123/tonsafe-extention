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
    async getBalance(server,address){
      const result = (await tonAPI.getAccountData(server,address));
      var balance;
      if(!result)
      balance =0;
      else
      balance = this.convertFromNano(result.balance);
      balance = this.convertFromNano(balance);
      console.log(balance); 
    },
    async decryptSecretKey(enc_key,password){
      var dec_key = CryptoJS.AES.decrypt(enc_key,password);  
      return dec_key.toString(CryptoJS.enc.Utf8); 
    },
    convertToNano(value) {
      const splitted = value.split('.');
      const intPart = BigInt(splitted[0]) * BigInt('1000000000');
      const decPart = BigInt(splitted.length > 1 ? `${splitted[1]}${'0'.repeat(9 - splitted[1].length)}` : '0');
      return intPart + decPart;
    },
    convertFromNano(amountNano) {
      const decimalNum=9;
      const minDecimalNum = 3;
      const amountBigInt = BigInt(amountNano);
      const integer = amountBigInt / BigInt('1000000000');
      const reminderStr = (amountBigInt % BigInt('1000000000')).toString();
      const decimalPrependZerosNum = 9 - reminderStr.length;
      const reminderRtrimedZeros = reminderStr.replace(/0+$/g, '');
      const decimalStr = `${'0'.repeat(decimalPrependZerosNum)}${reminderRtrimedZeros}`;
      const decimalCut = decimalStr.substr(0, decimalNum);
      const decimalResult = minDecimalNum - decimalCut.length > 0
        ? `${decimalCut}${'0'.repeat(minDecimalNum - decimalCut.length)}`
        : decimalCut;
      const integerFormatted = integer.toLocaleString();
      return `${integerFormatted}.${decimalResult.substring(0, 3)}`;
    }


};

export default wallet;
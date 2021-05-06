const { Account } = require("@tonclient/appkit");
const { TonClient } = require("@tonclient/core");
const { libWeb } = require("@tonclient/lib-web");
const { multisigContractPackage } = require('../contracts/safemultisig/SafeMultisigWallet.json');


const tonAPI={
     
    async setServer(server) {
    
    const serverDefault={
    client: null,
    server: server,
    SEED_PHRASE_WORD_COUNT: 12,
    SEED_PHRASE_DICTIONARY_ENGLISH: 1,
    HD_PATH: "m/44'/396'/0'/0/0"
    
    }
    
    const getClient= async()=>{
        try {
            if(!serverDefault.client){

                TonClient.useBinaryLibrary(libWeb);
                serverDefault.client = new TonClient({
                network: {
                    server_address: server
                }

            });

            
            }

            return serverDefault.client;
        }
        catch (error) {
            console.log(error);
        }
          
    };

    const generateSeed = async () => {
        try {
            var client = await getClient();
            return await client.crypto.mnemonic_from_random({ 
                dictionary: ton.SEED_PHRASE_DICTIONARY_ENGLISH, 
                word_count: ton.SEED_PHRASE_WORD_COUNT 
            });
        }
        catch (error) {
            console.log(error);
        }
    };

    const generateKeys = async (seed) => {
        try {
            var client = await getClient();

            return await client.crypto.mnemonic_derive_sign_keys({ 
                phrase, path: ton.HD_PATH, 
                dictionary: ton.SEED_PHRASE_DICTIONARY_ENGLISH, 
                word_count: ton.SEED_PHRASE_WORD_COUNT 
            });
        }
        catch (error) {
            console.log(error);
        }
    };



        
    }
}



export default{
    async newSeed(server){
        await ton.setClientServer(server);
        return await ton.client.crypto.mnemonic_from_random({ dictionary: ton.SEED_PHRASE_DICTIONARY_ENGLISH, word_count: ton.SEED_PHRASE_WORD_COUNT });
    },  
    async seedtoKeypair(server){
        await ton.setClientServer(server);
        return await ton.client.crypto.mnemonic_derive_sign_keys({ phrase, path: ton.HD_PATH, dictionary: ton.SEED_PHRASE_DICTIONARY_ENGLISH, word_count: ton.SEED_PHRASE_WORD_COUNT });
    },  
    async futureAddress(server,keys){
        await ton.setClientServer(server);
        const initParams={};
        const abi=multisigContractPackage.abi;
        const tvcInBase64=multisigContractPackage.tvcInBase64;
        return (await client.contracts.getDeployData({
            abi,
            tvcInBase64,
            initParams,
            publicKeyHex: keys.public,
            workchainId: 0,
          })).address;
    },
    async calcDeployfee(server,keys){
        await ton.setClientServer(server);
        const initParams={};
        const constructorParams = { owners: [`0x${keys.public}`], reqConfirms: 1 };
        return await client.contracts.calcDeployFees({
            package: multisigContractPackage,
            constructorParams,
            initParams,
            keys,
            emulateBalance: true,
            newaccount: true
          });
    },      
    async acoountData(server,address){
    await ton.setClientServer(server);
    return await client.queries.accounts.query({id: {in: address}}, 'id, balance(format: DEC), code_hash, boc');     
    }
}

export default tonAPI;
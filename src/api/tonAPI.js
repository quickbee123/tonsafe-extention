import multisigContractPackage from './contracts/safemultisig/SafeMultisigWallet.js';
const { TonClient , accountForExecutorUninit,signerKeys,abiContract } = require("@tonclient/core");
const { libWeb } = require("@tonclient/lib-web");


function LibBridge(){
TonClient.useBinaryLibrary(libWeb);
}
LibBridge();

const ton={

    client: null,
    server: null,
    SEED_PHRASE_WORD_COUNT: 12,
    SEED_PHRASE_DICTIONARY_ENGLISH: 1,
    HD_PATH: "m/44'/396'/0'/0/0",
    async getClient(server) {
        if (this.client===null || this.server!==server) {
          this.server=server;
          this.account=null;
          this.client = new TonClient({
            network: {
                server_address: server
            }
        });
        
      }
      return this.client;
    }
    
};

const tonAPI={

    async generateSeed(server){
        try {
            var client = await ton.getClient(server);
            return (await client.crypto.mnemonic_from_random({ 
                dictionary: ton.SEED_PHRASE_DICTIONARY_ENGLISH, 
                word_count: ton.SEED_PHRASE_WORD_COUNT 
            })).phrase;
        }
        catch (error) {
            console.log(error);
        }
    },
    async convertSeedToKeys(server,seed){
        try{
            var client = await ton.getClient(server);
            return await client.crypto.mnemonic_derive_sign_keys({ 
                phrase: seed, 
                path: ton.HD_PATH, 
                dictionary: ton.SEED_PHRASE_DICTIONARY_ENGLISH, 
                word_count: ton.SEED_PHRASE_WORD_COUNT 
            });
        }  
        catch (error) {
            console.log(error);
        }  
    }, 
    async getFutureAddress(server,keys) {
        try {
          var client = await ton.getClient(server);
          const {address} = await client.abi.encode_message(
            {
            abi: {
                type: 'Contract',
                value: multisigContractPackage.abi
            },
            deploy_set: {
                tvc: multisigContractPackage.tvc,
                initial_data: {}
            },
            call_set: {
                function_name: 'constructor',
                input: {
                    owners: [`0x${keys.public}`],
                    reqConfirms: 0
                }
            },
            signer: {
                type: 'Keys',
                keys: keys
            },
            processing_try_index: 1
            });
            
          return address;
        }
        catch (error) {
            console.log(error);
        }
      },
      async calculateDeployFees(server,keys) {
        try {
          var client = await ton.getClient(server);

        const message = await client.abi.encode_message(
            {
            abi: {
                type: 'Contract',
                value: multisigContractPackage.abi
            },
            deploy_set: {
                tvc: multisigContractPackage.tvc,
                initial_data: {}
            },
            call_set: {
                function_name: 'constructor',
                input: {
                    owners: [`0x${keys.public}`],
                    reqConfirms: 0
                }
            },
            signer: {
                type: 'Keys',
                keys: keys
            },
            processing_try_index: 1
            });
        
        const result = await client.tvm.run_executor({
            account: accountForExecutorUninit(),
            abi: {
                type: 'Contract',
                value: multisigContractPackage.abi
            },
            message: message.message,
        });
        return result.fees;
        }
        catch (error) {
            console.log(error);
        }
      },
      async deployContract(server,keys){
        try {
            var client = await ton.getClient(server);
            return await client.processing.process_message({
                send_events: false,
                message_encode_params: {
                    abi: {
                        type: 'Contract',
                        value: multisigContractPackage.abi
                    },
                    deploy_set: {
                        tvc: multisigContractPackage.tvc,
                        initial_data: {}
                    },
                    call_set: {
                        function_name: 'constructor',
                        input: {  
                            owners: [`0x${keys.public}`],
                            reqConfirms: 1
                        }
                    },
                    signer: {
                        type: 'Keys',
                        keys: keys
                    },
                    processing_try_index: 1
                }
            });
        }
        catch (error) {
            console.log(error);
        }

      },
      async getAccountData(server,address) {
        try {
          var client = await ton.getClient(server);
          return await client.net.query({"query": `
            query {
            accounts(
                filter: {
                id: {eq: "${address}"}
                }
            ) 
            {
                id
                code_hash
                boc
            }
            }
      `});
   
        }
        catch (error) {
            console.log(error);
        }
      }



}    
    
   

export default tonAPI;
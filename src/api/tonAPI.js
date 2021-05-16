import multisigContractPackage from './contracts/safemultisig/SafeMultisigWallet.js';
const { TonClient , accountForExecutorUninit,signerKeys,abiContract, signerNone } = require("@tonclient/core");
const { libWeb } = require("@tonclient/lib-web");
const transferAbi = require('./contracts/Transfer.json');


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
      async sendTransaction(server,amount,address,recipient,comment,keys){
        try{
        var client = await ton.getClient(server);
        const body = (await client.abi.encode_message_body({
            abi: abiContract(transferAbi),
            call_set: {
                function_name: "transfer",
                input:{
                    comment: Buffer.from(comment).toString('hex')
                }
            },
            is_internal: true,
            signer: signerNone(),
        })).body;

            const submitTransactionParams = {
                dest: recipient,
                value: amount,
                bounce: false,
                allBalance: false,
                payload: body
            };


            const params = {
                send_events: false,
                message_encode_params: {
                    address,
                    abi: {
                        type: 'Contract',
                        value: multisigContractPackage.abi
                    },
                    deploy_set: {
                        tvc: multisigContractPackage.tvc,
                        initial_data: {}
                    },
                    call_set: {
                        function_name: 'submitTransaction',
                        input: submitTransactionParams
                    },

                    signer: {
                        type: 'Keys',
                        keys: keys
                    },
                    processing_try_index: 1
                }
            }
            
            return await client.processing.process_message(params);
            
        }
        catch (error) {
            console.log(error);
        }
      },
      async calcTransactionFees(server,amount,address,recipient,comment,keys){
        try{
        var client = await ton.getClient(server);
        const body = (await client.abi.encode_message_body({
            address,
            abi: abiContract(transferAbi),
            call_set: {
                function_name: "transfer",
                input:{
                    comment: Buffer.from(comment).toString('hex')
                }
            },
            is_internal: true,
            signer: signerNone(),
        })).body;

            const submitTransactionParams = {
                dest: recipient,
                value: amount,
                bounce: false,
                allBalance: false,
                payload: body
            };

            
            const params = {
                    address,
                    abi: {
                        type: 'Contract',
                        value: multisigContractPackage.abi
                    },
                    deploy_set: {
                        tvc: multisigContractPackage.tvc,
                        initial_data: {}
                    },
                    call_set: {
                        function_name: 'submitTransaction',
                        input: submitTransactionParams
                    },

                    signer: {
                        type: 'Keys',
                        keys: keys
                    },
                    processing_try_index: 1
                
            }

            const {result} = await client.net.query_collection({
                collection: 'accounts',
                filter: {
                    id: {
                        eq: address
                    }
                },
                result: 'boc'
            });

            const boc = result[0].boc;
           
            const message = (await client.abi.encode_message(params));
            
            const result2 = await client.tvm.run_executor({
                account: {
                    type: 'Account',
                    boc: boc,
                    unlimited_balance: true
                },
                abi: {
                    type: 'Contract',
                    value: multisigContractPackage.abi
                },
                message: message.message,
            });
            
            const fees= result2.fees.total_account_fees;
            return fees;
        }
        catch (error) {
            console.log(error);
        }
      },
      async getAccountData(server,address) {
        try {
          var client = await ton.getClient(server);
          
          const {result} = await client.net.query_collection({
            collection: 'accounts',
            filter: {
                id: {
                    eq: address
                }
            },
            result: 'acc_type balance(format: DEC) code'
        });
        console.log(result);
        return result.length ? result[0] : null;
   
        }
        catch (error) {
            console.log(error);
        }
      },
      async getTransactions(server,address) {
        try {
          var client = await ton.getClient(server);
          const result = await client.net.query({"query": `
          query {
            transactions(
              filter: {
                account_addr: {eq: "${address}"}
              }
              orderBy: { path: "lt", direction: DESC }
              
            ) {
              id, now, block_id, in_msg, workchain_id, balance_delta(format:DEC)
            }
          }
          `});
          
          return result.result.data.transactions;
        } catch (error) {
            console.log(error);
        }
      }



}    
    
   

export default tonAPI;
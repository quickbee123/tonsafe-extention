import { openDB } from 'idb';

const storage = {

    db: null,


    async getDb() {
        if (!this.db) {
            this.db = await openDB('TONSafe', 1, {
                upgrade(db){
                    db.createObjectStore('wallets', { keyPath: "id", autoIncrement: true });
                    db.createObjectStore('options', { keyPath: "name" });
                }
            });
        }

        return this.db;
    }
    

};


export default storage;
import { MongoClient } from "mongodb"
import { MONGODB_USERNAME, MONGODB_PASSWORD } from "../helpers/environment-variables.js"


class Database {

    static CONNECTION_STRING = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@preppalcluster.qhyskle.mongodb.net/?retryWrites=true&w=majority`
    static USER_DATABASE = "Users"

    /**
     * Creates the MongoClient object
     */
    constructor() {
        this.client = new MongoClient(Database.CONNECTION_STRING)
    }

    /**
     * Sets the dbName and connects the client
     * @param {string} dbName The name of the database "TestDB", "ProdDB", etc...
     */
    async initialize(dbName) {
        this.dbName = dbName;
        this.db = this.client.db(this.dbName)
        await this._connect()
    }

    /**
     * Connects the db to the mongodb
     */
    async _connect() {
        await this.client.connect()
    }

}

const db = new Database()
export default db
import db from "../database/database.js";

export default class Repo {

    /**
     * Creates the Repo
     * @param {string} dbName The name of the database to connect to.
     */
    constructor(dbName) {
        this.dbName = dbName;
    }

    /**
     * Initializes the repo, connects to the database.
     */
    async initialize() {
        this.collection = db.db.collection(this.dbName);
    }

}

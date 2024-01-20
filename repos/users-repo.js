import Repo from "./repo.js";

class UsersRepo extends Repo {

    static DB_NAME = "Users"

    /**
     * Creates the user repo
     */
    constructor() {
        super(UsersRepo.DB_NAME);
    }

    /**
     * Creates a new user and adds it to the database.
     * @param {string} username The username of the user to add
     * @param {string} password The password of the user to add
     */
    async addUser(username, password) {
        return await this.collection.insertOne({ _id: username, password: password })
    }

    /**
     * Authenticates a user.
     * @param {string} username The username to authenticate
     * @returns An object containing user data if the user is found, null otherwise.
     */
    async getUser(username) {
        const user = await this.collection.findOne({ _id: username });

        // No user found
        if (!user) {
            return null
        }

        // Change _id to username
        user.username = user._id
        delete user._id
        delete user.password
        return user
    }


}

const USERS_REPO = new UsersRepo()
export default USERS_REPO
import Repo from "./repo.js";

<<<<<<< HEAD
class StudentsRepo extends Repo {

    static DB_NAME = "Students"
=======
class UsersRepo extends Repo {

    static DB_NAME = "Users"
>>>>>>> 0d5df9fa95f8c9446bc6e373e0c43e32d6a5dc8b

    /**
     * Creates the user repo
     */
    constructor() {
<<<<<<< HEAD
        super(StudentsRepo.DB_NAME);
=======
        super(UsersRepo.DB_NAME);
>>>>>>> 0d5df9fa95f8c9446bc6e373e0c43e32d6a5dc8b
    }

    /**
     * Creates a new user and adds it to the database.
     * @param {string} username The username of the user to add
     * @param {string} password The password of the user to add
     */
<<<<<<< HEAD
    async addStudent(username, password) {
        return await this.collection.insertOne({ _id: username, password: password, classes: [] })
    }

    /**
     * Gets a student from the db.
     * @param {string} username The username of the student
     * @returns An object containing user data if the student is found, null otherwise.
     */
    async getStudent(username) {
        const user = await this.collection.findOne({ _id: username });
=======
    async addUser(username, password) {
        return await this.collection.insertOne({ _id: username, password: password })
    }

    /**
     * Authenticates a user.
     * @param {string} username The username to authenticate
     * @param {string} password The password of the user
     * @returns An object containing user data if the user is found, null otherwise.
     */
    async getUser(username, password) {
        const user = await this.collection.findOne({ _id: username, password: password });
>>>>>>> 0d5df9fa95f8c9446bc6e373e0c43e32d6a5dc8b

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
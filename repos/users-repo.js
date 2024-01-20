import Repo from "./repo.js";

class StudentsRepo extends Repo {

    static DB_NAME = "Students"

    /**
     * Creates the user repo
     */
    constructor() {
        super(StudentsRepo.DB_NAME);
    }

    /**
     * Creates a new user and adds it to the database.
     * @param {string} username The username of the user to add
     * @param {string} password The password of the user to add
     */
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
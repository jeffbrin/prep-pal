import Topic from "../objects/topic.js";
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
     * @returns The student's username.
     */
    async addStudent(username, password) {
        const insertedObj = await this.collection.insertOne({ _id: username, password: password, classes: [] })
        return insertedObj.insertedId
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

        user.topics = user.topics.map(topic => new Topic(
            topic._id, topic.infoText, topic.files, topic.avgScore, topic.avgTimePerQuestion, topic.questionsCount
        ))

        // Change _id to username
        user.username = user._id
        delete user._id
        delete user.password
        return user
    }

    /**
     * Updates a topic to match the topic passed
     * @param {Topic} topic The new state of the topic to be updated.
     */
    async updateTopic(topic) {
        await this.collection.updateOne({ _id: topic.name }, topic.serialize())
    }

}

const studentsRepo = new StudentsRepo()
export default studentsRepo
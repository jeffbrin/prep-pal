import path from "path";
import { writeFile } from "../helpers/file-manager.js";
import Class from "../objects/class.js";
import Topic from "../objects/topic.js";
import Repo from "./repo.js";

class ClassRepo extends Repo {
    static DB_NAME = "Classes"

    /**
     * Creates the user repo
     */
    constructor() {
        super(ClassRepo.DB_NAME);
    }

    /**
     * Creates a class and adds it to the database.
     * @param {string} name The name of the class
     * @param {string} profName The name of the professor running the class
     * @param {Array} topics The topics for this class
     * @returns The class' class code.
     */
    async addClass(name, profName, topics = [], profEmail = null) {
        const classObj = await this.collection.insertOne(new Class(name, profName, topics, profEmail = profEmail).serialize())
        return classObj.insertedId
    }

    /**
     * Gets a student from the db.
     * @param {string} classCode The classCode of the class to query
     * @returns A class object, or null if no class was found with the given code
     */
    async getClass(classCode) {
        const classObj = await this.collection.findOne({ _id: classCode });

        // No user found
        if (!classObj) {
            return null
        }

        return new Class(classObj.name, classObj.professor, classObj.topics.map(topic => new Topic().copy(topic)), classObj._id)
    }

    /**
     * Adds a data file for a specific topic.
     * @param {string} classCode The code for the class
     * @param {string} topicName The name of the topic to add a file to
     * @param {string} filename The name of the file to write to.
     * @param {Any} data The data to save to the file.
     */
    async addTopicFile(classCode, topicName, filename, data) {
        await writeFile(data, path.join(Topic.DATA_FOLDER, filename))
        const classObj = await this.getClass(classCode)
        classObj.topics.forEach(topic => {
            if (topic.name == topicName) {
                topic.files.push(filename);
            }
        })
    }

}

const classRepo = new ClassRepo()
export default classRepo

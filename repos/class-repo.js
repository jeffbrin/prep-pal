import Class from "../objects/class.js";
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
     * @returns The class' class code.
     */
    async addClass(name, profName) {
        const classObj = await this.collection.insertOne(new Class(name, profName).serialize())
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

        return new Class(classObj.name, classObj.professor, classObj.topics, classObj.classCode)
    }

}

const classRepo = new ClassRepo()
export default classRepo

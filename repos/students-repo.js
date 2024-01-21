import { writeFile } from "../helpers/file-manager.js";
import Class from "../objects/class.js";
import Topic from "../objects/topic.js";
import Repo from "./repo.js";
import path from "path";

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
     * @param {Array} classes The classes for this student
     * @returns The student's username.
     */
    async addStudent(username, password, classes = []) {
        const insertedObj = await this.collection.insertOne({ _id: username, password: password, classes: classes.map(classObj => classObj.serialize()) })
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

        user.classes = user.classes.map(classObj => {
            classObj.topics = classObj.topics.map(topic => new Topic(
                topic._id, topic.infoText, topic.files, topic.avgScore, topic.avgTimePerQuestion, topic.questionsCount
            ));
            return new Class(classObj.name, classObj.professor, classObj.topics, classObj._id)
        })

        // Change _id to username
        user.username = user._id
        delete user._id
        delete user.password
        return user
    }

    /**
     * Updates a topic to match the topic passed
     * @param {string} classCode The code of the class the topic is in
     * @param {string} student The student to update
     * @param {Topic} topic The new state of the topic to be updated.
     */
    async updateTopic(classCode, student, topic) {
        // Get student
        const studentObj = await this.getStudent(student)
        studentObj.classes.forEach(classObj => {
            if (classObj.classCode == classCode) {
                classObj.topics.forEach(dbTopic => {
                    if (dbTopic.name == topic.name) {
                        dbTopic.copy(topic);
                    }
                })
            }
        })

        await this.collection.updateOne({ _id: student }, this.serializeStudent(studentObj))
    }

    /**
     * Adds a topic to the student's class
     * @param {string} classCode The classCode for the class
     * @param {string} student The student name
     * @param {Topic} topic The topic to add
     */
    async addTopic(classCode, student, topic) {
        const studentObj = await this.getStudent(student)
        studentObj.classes.forEach(classObj => {
            if (classObj.classCode == classCode) {
                console.log("Class Code Matched, adding topic")
                console.log(topic)
                if (!classObj.topics) {
                    classObj.topics = []
                }
                classObj.topics.push(topic)
            }
        })

        console.log(studentObj.classes.map(classObj => classObj.serialize()))
        await this.collection.updateOne({ _id: student }, {
            "$set": {
                classes: studentObj.classes.map(classObj => classObj.serialize())
            }
        })
    }

    /**
     * Adds a data file for a specific topic.
     * @param {string} student The name of the student.
     * @param {string} classCode The code for the class.
     * @param {string} topicName The name of the topic to add a file to
     * @param {string} filename The name of the file to write to.
     * @param {Any} data The data to save to the file.
     */
    async addTopicFile(student, classCode, topicName, filename, data) {
        await writeFile(data, path.join(Topic.DATA_FOLDER, filename))
        const studentObj = await this.getStudent(student)
        studentObj.classes.forEach(classObj => {
            if (classObj.classCode == classCode) {
                classObj.topics.forEach(topic => {
                    if (topic.name == topicName) {
                        topic.files.push(filename);
                    }
                })
            }
        })

        await this.collection.updateOne({ _id: student },
            {
                "$set": {
                    classes: studentObj.classes.map(classObj => classObj.serialize())
                }
            }
        )

    }

    /**
     * Adds a student ot a class
     * @param {string} student The student to add the class to 
     * @param {Class} classObj The class to add
     */
    async addClass(student, classObj) {
        const studentObj = await this.getStudent(student)
        studentObj.classes.push(classObj)

        await this.collection.updateOne({ _id: studentObj.username }, {
            "$set": {
                classes: studentObj.classes.map(classObj => classObj.serialize())
            }
        })
    }

    serializeStudent(studentObj) {
        const newStudentObj = structuredClone(studentObj)

        newStudentObj.classes = studentObj.classes.map(classObj => classObj.serialize())
        return newStudentObj
    }

}

const studentsRepo = new StudentsRepo()
export default studentsRepo
import { generateClassCode } from "../helpers/class-code.js"

export default class Class {

    static CLASS_CODE_LENGTH = 6

    /**
     * The name of the class
     */
    name

    /**
     * A list of topics included in this class
     */
    topics

    /**
     * The name of the professor
     */
    professor

    /**
     * Identifiable code used to find this class
     */
    classCode


    /**
     * Intiantiates a class 
     * @param {string} name The class name
     * @param {string} professor The professor's name
     * @param {Array} topics An array of topics (Optional)
     * @param {string} classCode The class code for this class
     */
    constructor(name, professor, topics = null, classCode = null) {
        this.name = name
        this.professor = professor
        this.topics = topics ? topics : []
        this.classCode = classCode ? classCode : generateClassCode(Class.CLASS_CODE_LENGTH).toUpperCase()
    }

    /**
     * Returns a serializable version of the class.
     * @returns A serializable version of a class
     */
    serialize() {
        return {
            _id: this.classCode,
            name: this.name,
            professor: this.professor,
            topics: this.topics.map(topic => topic.serialize())
        }
    }
}
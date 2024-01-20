
export default class Class {

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
     * Intiantiates a class 
     * @param {string} name The class name
     * @param {string} professor The professor's name
     * @param {Array} topics An array of topics (Optional)
     */
    constructor(name, professor, topics = null) {
        this.name = name
        this.professor = professor
        this.topics = topics ? topics : []
    }

    /**
     * Returns a serializable version of the class.
     * @returns A serializable version of a class
     */
    serialize() {
        return {
            name: this.name,
            professor: this.professor,
            topics: this.topics
        }
    }
}
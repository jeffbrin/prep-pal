/**
 * A topic in a class. Topics are created per student.
 */
export default class Topic {

    static DATA_FOLDER = "topic-data"

    /**
     * The name of the topic
     */
    name

    /**
     * The student's average score on questions related to this topic
     */
    avgScore

    /**
     * The average time spent by a student on questions related to this topic.
     */
    avgTimePerQuestion

    /**
     * The number of questions related to this topic answered by a student.
     */
    questionsCount

    /**
     * Files with data related to this topic.
     */
    files

    /**
     * Text with info related to this topic used to prompt the model
     */
    infoText

    /**
     * Instantiates the topic with a name
     * @param {string} name The name of the topic
     * @param {string} infoText Any info related to this topic to prompt the model with
     * @param {string} files Files with info related to this topic to prompt the model with
     */
    constructor(name, infoText = "", files = []) {
        this.name = name
        this.avgScore = 0
        this.avgTimePerQuestion = 0
        this.questionsCount = 0
        this.infoText = infoText
        this.files = files
    }



    /**
     * Updates the topic after the user answers a question.
     * @param {boolean} success Indicates whether the user got the correct answer.
     * @param {number} time The number of seconds the user took to answer the question.
     */
    answerQuestion(success, time) {
        const oldCount = this.questionsCount
        this.questionsCount += 1

        this.avgScore = ((oldCount * this.avgScore) + (success ? 1 : 0)) / this.questionsCount
        this.avgTimePerQuestion = ((oldCount * this.avgTimePerQuestion) + time) / this.questionsCount
    }

    /**
     * Returns a serializable version of the topic.
     * @returns A serializable version of a topic
     */
    serialize() {
        return {
            name: this.name,
            avgScore: this.avgScore,
            avgTimePerQuestion: this.avgTimePerQuestion,
            questionsCount: this.questionsCount
        }
    }
}
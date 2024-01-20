/**
 * A topic in a class. Topics are created per student.
 */
export default class Topic {

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
     * Instantiates the topic with a name
     * @param {string} name The name of the topic
     */
    constructor(name) {
        this.name = name
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
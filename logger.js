export class Logger {
    constructor() {

    }

    /**
     * Logs
     * @param {string} msg The message to log
     */
    log(msg) {
        console.log(msg)
    }

    /**
     * Logs an error
     * @param {string} err The error to log
     */
    error(err) {
        console.error(err)
    }
}
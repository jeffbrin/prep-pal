import fs from "fs/promises"
import path from "path"

export class LogType {
    static CONSOLE = 0
    static FILE = 1
}

class Logger {

    static STDOUT = "stdout.txt"
    static STDERR = "stderr.txt"

    /**
     * Instantiates the logger
     */
    constructor() {

    }

    /**
     * Sets the log type. If CONSOLE is selected, the output will be printed to console (Testing).
     * If FILE is set, an additional filename parameter must be passed and output will be written there.
     * @param {LogType} logtype The logtype for the logger
     * @param {string} outFolder The output folder for the log files
     */
    async initialize(logtype, outFolder = null) {
        this.logtype = logtype
        if (logtype == LogType.FILE) {
            if (outFolder == null) {
                throw Error("Filename must be provided for a FILE logger.")
            }
            this.outFolder = outFolder
            try {
                await fs.mkdir(this.outFolder)
            }
            catch (e) { }

            try {
                fs.writeFile(this.getLogFilename(), "")
                fs.writeFile(this.getErrorFilename(), "")
            }
            catch (e) { }
        }
    }

    getLogFilename() {
        return path.join(this.outFolder, Logger.STDOUT)
    }

    getErrorFilename() {
        return path.join(this.outFolder, Logger.STDERR)
    }

    /**
     * Logs
     * @param {string} msg The message to log
     */
    async log(msg) {
        switch (this.logtype) {
            case LogType.FILE:
                const filename = this.getLogFilename()
                await fs.appendFile(filename, msg)
                break;
            case LogType.CONSOLE:
                console.log(msg)
                break
        }
    }

    /**
     * Logs an error
     * @param {string} err The error to log
     */
    async error(err) {
        switch (this.logtype) {
            case LogType.FILE:
                const filename = this.getErrorFilename()
                await fs.appendFile(filename, err)
                break;
            case LogType.CONSOLE:
                console.log(err)
                break
        }
    }
}

export const LOGGER = new Logger()

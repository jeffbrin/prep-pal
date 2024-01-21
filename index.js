import app from "./app.js";
import db from "./database/database.js";
import studentsRepo from "./repos/students-repo.js";
import classRepo from "./repos/class-repo.js"
import { LOGGER, LogType } from "./logger.js";
const port = 80;

const DB_NAME = "TestDB"

async function main() {

    await db.initialize(DB_NAME)
    await studentsRepo.initialize()
    await classRepo.initialize()
    await LOGGER.initialize(LogType.CONSOLE);
    app.listen(port) // Run the server
    LOGGER.log(`Listening on port ${port}`)
}

main()
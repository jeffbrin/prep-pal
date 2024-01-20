import db from "./database/database.js";
import classRepo from "./repos/class-repo.js";

async function main() {
    await db.initialize("TestDB")
    await classRepo.initialize()
    const classCode = await classRepo.addClass("Linear Algebra", "Noomen Ghorbel")

    console.log(await classRepo.getClass(classCode))
}

main()
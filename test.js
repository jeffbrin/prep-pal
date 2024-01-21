import path from "path";
import db from "./database/database.js";
import Topic from "./objects/topic.js";
import classRepo from "./repos/class-repo.js";
import studentsRepo from "./repos/students-repo.js";

async function main() {
    await db.initialize("TestDB");
    await studentsRepo.initialize()
    await classRepo.initialize()
    await studentsRepo.addStudent("TestStudent2", "TestPassword")
    const classCode = await classRepo.addClass("Linear", "Noomen Ghorbel", [new Topic("Subspaces")])
    await studentsRepo.addClass("TestStudent2", await classRepo.getClass(classCode))
    // await studentsRepo.addTopic(classCode, "TestStudent2", new Topic("Subspaces"))

    // await classRepo.addTopicFile(classCode, "Subspaces", "subspaces-info.txt", { info: 'SubspaceInfo' });
    // await studentsRepo.addTopicFile("TestStudent2", classCode, "Subspaces", "subspaces-info-stud.txt", { info: "SubspacesInfo" })


    // await studentsRepo.addClass("TestStudent2", classRepo.getClass("Q5SBEN"))
    // const student = await studentsRepo.addStudent("TestStudent2", "Password", [await classRepo.getClass("Q5SBEN")])
    const studentObj = await studentsRepo.getStudent("TestStudent2")
    await studentsRepo.addTopic(classCode, "TestStudent2", new Topic("Subspaces"))
    studentsRepo.addTopicFile("TestStudent2", studentObj.classes[0].classCode, "Subspaces", "subspaces-info.txt", { "Subspaces": 100 })

}

main()
import db from "./database/database.js";
import studentsRepo from "./repos/students-repo.js";
import classRepo from "./repos/class-repo.js";
import Topic from "./objects/topic.js";
import { readFile } from "./helpers/file-manager.js";
import path from "path";


async function main() {
    const data = (await readFile(path.join(Topic.DATA_FOLDER, "array.txt"))).toString()
    // await db.initialize("TestDB");
    // await studentsRepo.initialize();
    // await classRepo.initialize();

    // const STUDENT_NAME = "Timmy"

    // // 1 Student
    // await studentsRepo.addStudent(STUDENT_NAME, "TimmyPassword")
    // // 2 Classes
    // // 3 Topics each
    // const classCode1 = await classRepo.addClass(
    //     "Data Structures and Algorithms",
    //     "Ms. Data Gal",
    //     [
    //         new Topic("Hash Maps", "", "hashmap.txt"),
    //         new Topic("Linked Lists", "", "linked-list.txt"),
    //         new Topic("Arrays", "", "array.txt"),
    //     ])
    // const classCode2 = await classRepo.addClass(
    //     "History",
    //     "History Buff",
    //     [
    //         new Topic("Christopher Columbus", "", "columbus.txt"),
    //         new Topic("Rosa Parks", "", "parks.txt"),
    //         new Topic("Nelson Mandela", "", "mandela.txt"),
    //     ])

    // await studentsRepo.addClass(STUDENT_NAME, await classRepo.getClass(classCode1))
    // await studentsRepo.addClass(STUDENT_NAME, await classRepo.getClass(classCode2))

}

main()
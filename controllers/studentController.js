import express from 'express';
import pkg from 'express-openid-connect';
const requiresAuth = pkg.requiresAuth
import studentsRepo from '../repos/students-repo.js';
import assistant from '../helpers/chatbot.js';
import path from 'path';
import Topic from '../objects/topic.js';
import classRepo from '../repos/class-repo.js';
import { readFile } from '../helpers/file-manager.js';

//Create a new express router
const studentRouter = express.Router();

studentRouter.get('/classes', requiresAuth(), (req, res) => {
    let firstName = req.firstName;
    studentsRepo.getStudent(req.email).then(student => {
        res.render('student/classes.hbs', { currentPage: "Classes", username: firstName, classes: student.classes });
    });
});

studentRouter.get('/course', requiresAuth(), (req, res) => {
    res.render('student/course.hbs', { currentPage: "Course", username: "placeholder name" });
});

studentRouter.get('/join-class', requiresAuth(), (req, res) => {
    res.render('student/join-class.hbs', { currentPage: "Join Class", username: req.firstName });
});

studentRouter.post('/join-class', requiresAuth(), async (req, res) => {
    await studentsRepo.addClass(req.email, await classRepo.getClass(req.body.classCode))
    res.redirect('/student/classes');
})

studentRouter.get('/topic', requiresAuth(), async (req, res) => {
    // TODO: Send these to this endpoint
    const topicName = req.query.topic
    const classCode = req.query.classCode

    const student = await studentsRepo.getStudent(req.email);
    let topic;
    student.classes.forEach(classObj => {
        if (classObj.classCode == classCode) {
            classObj.topics.forEach(topicObj => {
                if (topicObj.name == topicName) {
                    topic = topicObj;
                }
            })
        }
    })

    let data = ""
    // Get any data from topic file
    topic.files.forEach(async file => {
        const filename = path.join(Topic.DATA_FOLDER, file)
        const fileData = (await readFile(filename)).toString();
        data += fileData + "\n"
    })

    data += topic.infoText

    await assistant.initializeThread(req.email, topic, data)
    res.render('student/topic.hbs', { currentPage: "Topic", username: req.firstName });
});

studentRouter.post("/query_bot", requiresAuth(), async (req, res) => {
    const email = req.email;
    console.log(email)
    const msg = req.body.msg;

    console.log(msg)
    const response = await assistant.sendMessageAndGetResponse(email, msg);
    console.log(response)
    res.send(response)
})

export default studentRouter;
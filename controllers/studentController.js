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

const maxQuestions = 7;
let questionCount = 0;

studentRouter.get('/classes', requiresAuth(), (req, res) => {
    let firstName = req.firstName;
    studentsRepo.getStudent(req.email).then(student => {
        res.render('student/classes.hbs', { currentPage: "Classes", username: firstName, classes: student.classes });
    });
});

studentRouter.get('/course', requiresAuth(), async (req, res) => {
    let firstName = req.firstName;
    const classObj = await classRepo.getClass(req.query.classCode)
    const topics = classObj.topics
    res.render('student/course.hbs', { currentPage: "Course", username: firstName, topics: topics, classCode: classObj.classCode });
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

    await assistant.initializeThread(req.firstName, req.email, topic, "")
    await assistant.sendMessageAndGetResponse(req.email, `Think of a question which tests an aspect of ${topic.name}. Each question must be at least 2 sentences long." +
    Unless the answer to the question is a statement of fact, add a sentence of context to your question." +
    "I will ask you to either give me a new question or I will give you a question by the student in the following messages.`)
    const question = await assistant.sendMessageAndGetResponse(req.email, "Ask the first question. Do not respond to me, simply ask the question.")
    res.render('student/topic.hbs', { currentPage: "Topic", username: req.firstName, question: question });
});

studentRouter.post("/submit-answer", requiresAuth(), async (req, res) => {
    const email = req.email;
    const msg = req.body.msg;

    const answer = `The following is the student's answer to your previous question: "${msg}". ` +
        'Please respond in the following json format: {"correct": bool, "explanation": ...}. ' +
        "The explanation should follow the following format. 1 sentence saying whether the answer was right or wrong, " +
        "3 sentences or more explaining the correct solution. Write the explanation directly to the student."

    const response = await assistant.sendMessageAndGetResponse(email, answer);
    res.send(response)
})

studentRouter.post("/next-question", requiresAuth(), async (req, res) => {

    const email = req.email;
    //const msg = 'Ask the next question. Do not respond to me, only ask the question. If you have asked all the original questions, respond with "{}".'
    const msg = 'If the student didn\'t answer the question correctly, ask another question similar to the previous one. ' +
        'If the student answered the question correctly, ask a completely different question about the same topic. '
    const response = await assistant.sendMessageAndGetResponse(email, msg);
    res.send(response);
})

studentRouter.post('/ask-question', requiresAuth(), async (req, res) => {
    const email = req.email;
    const question = req.body.question;
    const answer = await assistant.sendMessageAndGetResponse(email, question);

    res.send(answer);
})

studentRouter.post("/end-session", requiresAuth(), async (req, res) => {
    delete assistant.threads[req.email]
    res.sendStatus(200);
})

export default studentRouter;
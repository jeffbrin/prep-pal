import express from 'express';
import pkg from 'express-openid-connect';
const requiresAuth = pkg.requiresAuth

//Create a new express router
const studentRouter = express.Router();

studentRouter.get('/classes', requiresAuth(), (req, res) => {
    res.render('student/classes.hbs', { currentPage: "Classes", username: "placeholder name" });
});

studentRouter.get('/course', requiresAuth(), (req, res) => {
    res.render('student/course.hbs', { currentPage: "Course", username: "placeholder name" });
});

studentRouter.get('/review', requiresAuth(), (req, res) => {
    res.render('student/review.hbs', { currentPage: "Review", username: "placeholder name" });
});

studentRouter.get('/topic', requiresAuth(), (req, res) => {
    res.render('student/topic.hbs', { currentPage: "Topic", username: "placeholder name" });
});

export default studentRouter;
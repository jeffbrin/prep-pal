import express from 'express';

//Create a new express router
const studentRouter = express.Router();

studentRouter.get('/classes', (req, res) => {
    res.render('student/classes.hbs', { currentPage: "Classes", username: "placeholder name" });
});

studentRouter.get('/course', (req, res) => {
    res.render('student/course.hbs', { currentPage: "Course", username: "placeholder name" });
});

studentRouter.get('/review', (req, res) => {
    res.render('student/review.hbs', { currentPage: "Review", username: "placeholder name" });
});

studentRouter.get('/topic', (req, res) => {
    res.render('student/topic.hbs', { currentPage: "Topic", username: "placeholder name" });
});

export default studentRouter;
import express from 'express';

//Create a new express router
const studentRouter = express.Router();

studentRouter.get('/classes', (req, res) => {
    res.render('student/classes.hbs', { currentPage: "classes" });
});

studentRouter.get('/course', (req, res) => {
    res.render('student/course.hbs', { currentPage: "course" });
});

studentRouter.get('/review', (req, res) => {
    res.render('student/review.hbs', { currentPage: "review" });
});

studentRouter.get('/topic', (req, res) => {
    res.render('student/topic.hbs', { currentPage: "topic" });
});

export default studentRouter;
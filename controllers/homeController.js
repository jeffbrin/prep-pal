import express from 'express';
import studentsRepo from '../repos/students-repo.js';

//Create a new express router
const router = express.Router();

//Define the home page route
router.get('/', async (req, res) => {

    if (req.email) {
        if (!await studentsRepo.getStudent(req.email))
            await studentsRepo.addStudent(req.email);

        let firstName = req.firstName;
        // GET OUT OF HERE ABDEL I wanna be able to go to the home page when logged in lmao
        // Sincerely, Jeffrey
        // studentsRepo.getStudent(req.email).then(student => {
        //     res.render('student/classes.hbs', { currentPage: "Classes", username: firstName, classes: student.classes });
        // });
    }
    else {
        // Render the home page view
        res.render('home.hbs', { currentPage: "Home" });
    }
});

export default router;

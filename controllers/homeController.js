import express from 'express';
import studentsRepo from '../repos/students-repo.js';

//Create a new express router
const router = express.Router();

//Define the home page route
router.get('/', async (req, res) => {

    if (req.email) {
        if (!await studentsRepo.getStudent(req.email))
            await studentsRepo.addStudent(req.email);
    }

    // Render the home page view
    res.render('home.hbs', { currentPage: "Home", username: req.firstName });
});

export default router;

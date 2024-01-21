import express from 'express';

//Create a new express router
const router = express.Router();

//Define the home page route
router.get('/', (req, res) => {
    // Render the home page view
    res.render('home.hbs', { currentPage: "Home" });
});

//Define a route for the sign-up page
router.get('/signup', (req, res) => {
    // Render the sign-up page view
    res.render('signup.hbs', { currentPage: "Signup" });
});

//Define a route for the sign-in page
router.get('/login', (req, res) => {
    // Render the login page view
    res.render('login.hbs', { currentPage: "Login" });
});

export default router;

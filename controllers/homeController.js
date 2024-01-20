import express from 'express';
//import { auth0 } from '../config/auth0'; // auth0 configuration

//Create a new express router
const router = express.Router();
//Define the route root
const routeRoot = '/';


//Define the home page route
router.get('/', (req, res) => {
    // Render the home page view
    res.render('home.hbs', { error: "Testing error", confirmation: "Testing confirmation", currentPage: "home"});
});

//Define a route for the sign-up page
router.get('/signup', (req, res) => {
    // Render the sign-up page view
    res.render('signup.hbs');
});

//Define a route for the sign-in page
router.get('/login', (req, res) => {
    // Render the login page view
    res.render('login.hbs');
});

export default router;

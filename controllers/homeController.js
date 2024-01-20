import express from 'express';
//import { auth0 } from '../config/auth0'; // auth0 configuration

//Create a new express router
const router = express.Router();
//Define the route root
const routeRoot = '/';


//Define the home page route
homeRouter.get('/', (req, res) => {
    // Render the home page view
    res.render('home.hbs');
});

//Define a route for the sign-up page
homeRouter.get('/signup', (req, res) => {
    // Render the sign-up page view
    res.render('signup.hbs');
});

//Define a route for the sign-in page
homeRouter.get('/login', (req, res) => {
    // Render the login page view
    res.render('login.hbs');
});

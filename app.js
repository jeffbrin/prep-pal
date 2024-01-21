import express from "express";
import { LOGGER } from "./logger.js";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import router from './controllers/homeController.js';
import { eq, or } from "./helpers/handlebars-helpers.js";
import studentRouter from './controllers/studentController.js';
import { auth } from "express-openid-connect"
import cookieParser from "cookie-parser";
import { getAccessToken } from "./helpers/get-user-info.js";

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:80',
    clientID: '65t9BZBDKxkC3kNGS5SRinTEDUsdPf1K',
    issuerBaseURL: 'https://dev-g2exa1anduv12asq.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(getAccessToken)
app.use(cookieParser())


// Tell the app to use handlebars templating engine.  
// Configure the engine to use a simple .hbs extension to simplify file naming
app.engine('hbs', engine({ extname: '.hbs', helpers: { eq, or } }));
app.set('view engine', 'hbs');
app.set('views', './views');  // indicate folder for views


// Add support for forms+json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static('public'))

try {
    app.use('/', router);
    app.use('/student', studentRouter);
} catch (error) {
    //fail gracefully if no routes for this controller
    LOGGER.error(error);
}
export default app;
import express from "express";
import { LOGGER } from "./logger.js";
const app = express();
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import router from './controllers/homeController.js';
import { eq, or } from "./helpers/handlebars-helpers.js";
import studentRouter from './controllers/StudentController.js';
import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: 'https://preppal.tech',
    issuerBaseURL: 'https://dev-g2exa1anduv12asq.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// Tell the app to use handlebars templating engine.  
// Configure the engine to use a simple .hbs extension to simplify file naming
app.engine('hbs', engine({ extname: '.hbs', helpers: { eq, or } }));
app.set('view engine', 'hbs');
app.set('views', './views');  // indicate folder for views

app.use(jwtCheck)

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
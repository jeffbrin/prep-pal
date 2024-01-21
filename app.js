import express from "express";
import { LOGGER } from "./logger.js";
const app = express();
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import router from './controllers/homeController.js';
import { eq, or } from "./helpers/handlebars-helpers.js";
import studentRouter from './controllers/StudentController.js';

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
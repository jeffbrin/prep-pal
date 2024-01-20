import Express from "express";
import logger from "./logger";
const app = Express();
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser')

logger.info("Creating app");

// Tell the app to use handlebars templating engine.  
// Configure the engine to use a simple .hbs extension to simplify file naming
app.engine('hbs', engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');  // indicate folder for views
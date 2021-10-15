const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const handlebars = require('express-handlebars');
const handlebarsSections = require('express-handlebars-sections');
const port = process.env.PORT || 3000;
const route = require('./routes');
const registerHelper = require('./app/helpers/registerHelper');
const publicPath = path.join(__dirname, '../views');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//Config .env
require('dotenv').config();

//Connect DB
const db = require('./config/db/index');
db.connect();

//Use static file
app.use(express.static(path.join(__dirname, 'public')));

//Use morgan
app.use(morgan('combined'));

//Config body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Use express session
app.use(
    session({
        secret: 'shhhhhh',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    }),
);

app.use(cookieParser());
app.use(flash());

//Override method
app.use(methodOverride('_method'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// app.get('/mail', function(req, res) {
//     res.render('login/email', {
//         title: 'Sign up',
//         error: req.flash('error') ?? null,
//         errors: req.flash('errors') ?? null,
//         success: req.flash('success') ?? null,
//     });
// });

//Create handlebar section
const hbs = handlebars.create({});
handlebarsSections(hbs);

//Config extension handlebar
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./app/helpers/handlebars'),
    }),
);

//Register helper
registerHelper.run();

//Set view engine handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

//User route
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

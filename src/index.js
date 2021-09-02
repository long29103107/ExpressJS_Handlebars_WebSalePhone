const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const handlebars = require('express-handlebars');
const handlebarsSections = require('express-handlebars-sections');
const port = 3000;
const route = require('./routes');

//Config .env
require('dotenv').config();

//Connect DB
const db = require('./config/db/index');
db.connect();

//Use static file
app.use(express.static(path.join(__dirname, 'public')));

//Use morgan
app.use(morgan('combined'));

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

//Create for loop helpers
hbs.handlebars.registerHelper('for', function (from, to, incr, block) {
    var data;

    if (block.data) {
        data = hbs.handlebars.createFrame(block.data);
    }

    var accum = '';
    for (var i = from; i < to; i += incr) {
        if (data) {
            data.index = i;
        }
        accum += block.fn(i, { data: data });
    }
    return accum;
});

//Set view engine handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

//User route
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

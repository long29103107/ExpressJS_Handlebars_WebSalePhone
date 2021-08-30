const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const handlebars = require('express-handlebars');
const handlebarsSections = require('express-handlebars-sections');
const port = 3000;
const route = require('./routes');

const db = require('./config/db/index');

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

const hbs = handlebars.create({});
handlebarsSections(hbs);

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            section: function (name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            },
        },
    }),
);

hbs.handlebars.registerHelper('for', function (from, to, incr, block) {
    var accum = '';
    for (var i = from; i < to; i += incr) accum += block.fn(i);
    return accum;
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

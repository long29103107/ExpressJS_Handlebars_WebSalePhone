const handlebars = require('express-handlebars');
const handlebarsSections = require('express-handlebars-sections');
const paginateHelper = require('express-handlebars-paginate');

const hbs = handlebars.create({});
handlebarsSections(hbs);

module.exports = {
    run: function () {
        //Create for loop
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

        //Register debug
        hbs.handlebars.registerHelper('debug', function (data, breakpoint) {
            console.log(data);
            if (breakpoint === true) {
                debugger;
            }
            return '';
        });

        hbs.handlebars.registerHelper(
            'ifEquals',
            function (arg1, arg2, options) {
                return arg1 == arg2 ? options.fn(this) : options.inverse(this);
            },
        );

        hbs.handlebars.registerHelper(
            'ifNotEquals',
            function (arg1, arg2, options) {
                return !(arg1 == arg2)
                    ? options.fn(this)
                    : options.inverse(this);
            },
        );

        hbs.handlebars.registerHelper('switch', function (value, options) {
            this.switch_value = value;
            return options.fn(this);
        });

        hbs.handlebars.registerHelper('case', function (value, options) {
            if (value == this.switch_value) {
                return options.fn(this);
            }
        });

        hbs.handlebars.registerHelper('default', function (value, options) {
            // return true;
        });

        hbs.handlebars.registerHelper(
            'paginateHelper',
            paginateHelper.createPagination,
        );

        hbs.handlebars.registerHelper('selected', function (option, value) {
            if (option === value) {
                return ' selected';
            } else {
                return '';
            }
        });
    },
};

const mongoose = require('mongoose');
require('dotenv').config();
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(process.env.DB_URI);
autoIncrement.initialize(connection);

module.exports = {
    AutoIncrement: function (schema, model) {
        return schema.plugin(autoIncrement.plugin, model);
    },
};

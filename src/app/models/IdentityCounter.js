const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Identitycounter = new Schema(
    {
        model: { type: String },
        field: { type: String },
        count: { type: Number },
    },
    {
        collection: 'identitycounters',
    },
);

module.exports = mongoose.model('Identitycounter', Identitycounter);

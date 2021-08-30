const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    user_image: { type: String, default: null },
    status: { type: Boolean, default: true },
    active: { type: Boolean, default: false },
    slug: { type: String, required: true },
});

module.exports = mongoose.model('User', User);

const mongoose = require('mongoose');

module.exports = {
    connect: async function () {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        };

        await mongoose.connect(process.env.DB_URL, options);
    },
    exit: function () {
        mongoose.disconnect();
    },
};

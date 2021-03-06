const mongoose = require('mongoose');

async function connect() {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        };

        await mongoose.connect(process.env.DB_URL, options);
        // console.log("success");
    } catch (error) {
        // console.log("fail");
    }
}
module.exports = { connect };

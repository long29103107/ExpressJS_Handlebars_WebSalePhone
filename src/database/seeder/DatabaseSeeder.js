require('dotenv').config();

if (process.env.DB_URL) {
    require('./UserSeeder')();
    require('./CategorySeeder')();
}

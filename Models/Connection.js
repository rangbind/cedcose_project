const mongoose = require('mongoose');
const conn = mongoose.createConnection(`${process.env.DB_URL}/${process.env.DB_DATABASE}`);
module.exports = conn;
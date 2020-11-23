const mongoose = require('mongoose')

function connectToDB() {
    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
    }
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    //Get the default connection
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to database.")
    });
    db.on('close', () => console.log("Database connection is closed!"))
}

module.exports = connectToDB
const express = require('express');
const app = express();
const expressConfig = require('./config/express');
const authConfig = require('./config/authentication');
const mongoConfig = require('./config/mongodb');
const mongoose = require('mongoose');

mongoose.connect(mongoConfig.connectionString, (err) => {
    if(err) console.error(err);
    else console.log("Connected to mongoDB");
});
authConfig.setup();
expressConfig(app);

app.listen(1234, () => {
    console.log("App is listening");
});
const express = require('express');
const app = express();

require('dotenv').config;
const signale = require('signale');
const mongoose = require('mongoose');

const verify = require('./routes/verify');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    signale.success('Connected to the database!');
});

app.use(express.static('public'));
app.use('/verify', verify);


app.listen(port, () => {
    signale.info(`Sever listening on port: ${port}`);
});
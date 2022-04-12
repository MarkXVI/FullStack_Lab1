const express = require('express');
const app = express();

const dotenv = require('dotenv');
const signale = require('signale');
const mongoose = require('mongoose');

const user = require('./routes/user');

dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    signale.success('Connected to the database!');
});

app.use(express.json());
app.use(express.static('public'));
app.use("/user", user);

app.listen(port, () => {
    signale.info(`Sever listening on port: ${port}`);
});

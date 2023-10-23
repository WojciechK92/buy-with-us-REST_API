const express = require('express');
const router = require('./routes/api');

const app = express();

// database
require('./db/mongoose');

// body parser
app.use(express.json());

app.use(router);

module.exports = app;
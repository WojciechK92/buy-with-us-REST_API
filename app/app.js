const express = require('express');
const router = require('./routes/api');
const helmet = require('helmet');
const rateLimiterMiddleware = require('./middleware/rate-limiter-middleware');

const app = express();

// safety
app.use(helmet());
app.use(rateLimiterMiddleware);

// public folder
app.use(express.static('public'));

// database
require('./db/mongoose');

// body parser
app.use(express.json());

// routes
app.use(router);

module.exports = app;
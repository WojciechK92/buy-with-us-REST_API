const express = require('express');
const router = require('./routes/api');
const helmet = require('helmet');
const rateLimiterMiddleware = require('./middleware/rate-limiter-middleware');

const app = express();

// safety
app.use(helmet());
app.use(rateLimiterMiddleware);

// database
require('./db/mongoose');

// body parser
app.use(express.json());

app.use(router);

module.exports = app;
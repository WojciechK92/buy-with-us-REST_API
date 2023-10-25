const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 1,
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req)
    .then(() => next())
    .catch(() => {
      res.status(429).json({ errros: { message: 'Too many requests' } });
    });
};

module.exports = rateLimiterMiddleware;
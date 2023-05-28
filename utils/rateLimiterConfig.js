const expressRateLimit = require('express-rate-limit');

const expressLimiter = expressRateLimit({
  windowMs: 20 * 60 * 1000,
  max: 120,
});

module.exports = expressLimiter;

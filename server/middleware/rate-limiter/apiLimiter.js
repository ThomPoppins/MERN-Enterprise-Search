import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
  // 15 minutes:
  windowMs: 15 * 60 * 1000,
  // limit each IP to 100 requests per windowMs:
  max: 10000,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  // The rest of the options:
  headers: true,
  skip: (request) => request.ip === '::ffff:127.0.0.1',
})

export default apiLimiter

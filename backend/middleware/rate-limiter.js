import rateLimiter from 'express-rate-limit'

export const apiLimiter = rateLimiter({
  windowMs: 600000,
  max: 15,
  message: 'Too many requests, try again later.',
})

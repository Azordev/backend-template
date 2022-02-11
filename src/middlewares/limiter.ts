import rateLimit from 'express-rate-limit'

const limiter = (minutes: number) =>
  rateLimit({
    windowMs: minutes * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })

export default limiter

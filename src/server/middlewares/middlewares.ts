import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import errorHandler from 'errorhandler'
import helmet from 'helmet'
import methodOverride from 'method-override'
import morgan from 'morgan'
import responseTime from 'response-time'
import logger, { stream } from '../../lib/logger'
import { globalEnv } from '../app'
import { corsOption, originUndefined } from './cors'

const middlewares = (app) => {
  const isProduction = globalEnv.isProductionEnvironment()

  // Enable if you're behind a reverse proxy (Heroku in our case)
  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1)
  app.disable('x-powered-by')
  app.use(responseTime())
  app.use(helmet())
  app.use(originUndefined, cors(corsOption()))

  // Used to extract info and pass it to wiston
  app.use(
    morgan(
      ':remote-addr - :remote-user ":method :url HTTP/:http-version" status: :status :res[content-length] - :response-time ms ":referrer" ":user-agent"',
      {
        stream,
      },
    ),
  )

  app.use(compression())
  app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '5mb' }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  app.use(methodOverride('X-HTTP-Method-Override'))

  app.use((req, res, next) => {
    if (
      isProduction &&
      !(req.secure || req.headers['x-forwarded-proto'] === 'https')
    ) {
      res.redirect(
        `https://${req.hostname}:${process.env.PORT_HTTPS}${req.url}`,
      )
    } else {
      next()
    }
  })

  if (!isProduction) {
    app.use(
      errorHandler({
        log: (err, str, req) =>
          logger.error(`Error in ${req.method} ${req.url}`, str, err.msg),
      }),
    )
  }

  app.get('*', function (req, _res, next) {
    if (!isProduction) {
      logger.info(`Request: ${req.method} http://${req.headers.host}${req.url}`)
    }

    return next()
  })
}

export default middlewares

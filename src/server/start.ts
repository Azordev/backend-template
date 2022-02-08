import http, { RequestListener } from 'http'
import https from 'https'
import logger, { debug } from '../lib/logger'
import { globalEnv } from './app'

const start = (app: Express.Application) => {
  const { port, portHttps, isProductionEnvironment } = globalEnv
  const httpPort = normalizePort(port)
  const httpsPort = normalizePort(portHttps)

  http
    .createServer(app as unknown as RequestListener)
    .listen(httpPort)
    .on('error', onError)
    .on('listening', onListening)

  // Liked the banner? http://patorjk.com/software/taag/
  logger.info(`                                                                                    
 /\\ _  _  _ _| _   
/--\\/_(_)| (_|(-\\/
        `)

  logger.info(`App listening on http://localhost:${httpPort}/ping`)

  if (!isProductionEnvironment) {
    /**
     * Create HTTPS server.
     */
    const options = {
      //   cert: fs.readFileSync('cert/cert.pem') || null,
      //   key: fs.readFileSync('cert/key.pem') || null
    }

    https
      .createServer(options, app as unknown as RequestListener)
      .listen(httpsPort)
      .on('error', onError)
      .on('listening', onListening)
  }

  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val: string | number) {
    const port = typeof val === 'string' ? parseInt(val, 10) : val

    if (isNaN(port)) {
      // named pipe
      return val
    }

    if (port >= 0) {
      // port number
      return port
    }

    return false
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error: { syscall: string; code: string }) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const port = this.cert ? httpsPort : httpPort
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        debug.error(` ${bind} requires elevated privileges`)
        process.exit(1)
      case 'EADDRINUSE':
        debug.error(`${bind} is already in use`)
        process.exit(1)
      default:
        throw error
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    const addr = this.address()
    const type = this.cert ? '(HTTPS)' : '(HTTP)'
    const bind =
      (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`) +
      ` ${type}`
    logger.info(bind)
  }
}

export default start

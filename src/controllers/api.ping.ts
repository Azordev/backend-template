import { appInformation } from './utils/systemInfo'
import send from './utils/responses'
import { Response } from 'express'

export default (_req, res: Response) => {
  const information = appInformation() || {}

  send(res, 200, [{ ...information, uptime: process.uptime(), ping: 'PONG!' }])
}

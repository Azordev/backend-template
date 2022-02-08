import { Request, Response } from 'express'
import { appInformation } from './utils/systemInfo'
import send from './utils/responses'

export default (_req: Request, res: Response) => {
  const information = appInformation() || {}

  send(res, 200, [{ ...information, ping: 'PONG!' }])
}

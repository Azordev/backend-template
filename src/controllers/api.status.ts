import { Request, Response } from 'express'
import sendResponse from './utils/responses'
import { serverInformation } from './utils/systemInfo'

export default (_req: Request, res: Response) => {
  const information = serverInformation() || {}

  sendResponse(res, 200, [{ ...information }])
}

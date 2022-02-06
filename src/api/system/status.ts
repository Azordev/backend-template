import sendResponse from '../utils/responses'
import { serverInformation } from '../utils/systemInfo'

export default (_req, res) => {
  const information = serverInformation() || {}

  sendResponse(res, 200, [{ ...information }])
}

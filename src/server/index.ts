import server from './app'
import api from '../routes'
import start from './start'
const withAPI = api(server)

start(withAPI)

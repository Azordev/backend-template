import server from './app'
import api from '../api'
import start from './start'
const withAPI = api(server)

start(withAPI)

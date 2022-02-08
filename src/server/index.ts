import app from './app'
import api from '../api'
import start from './start'
const withAPI = api(app)

start(withAPI)

import * as railsVars from 'src/modules/lib/RailsVars'
import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.headers['Accept'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['X-CSRF-TOKEN'] = railsVars.csrfToken()

export default axios

import axios from 'axios'
import { API_ROOT } from '../middleware/api'
import { fetchJobs } from '../middleware/accounts'

const getToken = () => {
  let ptoken = axios.get(API_ROOT + 'accounts')
    .then(response => {
      console.log(response)
      let token = response.data
      return token
    })
  return ptoken
}

export const bearer = (location, _setToken, dispatch) => {
  // Retrieves the custom bearer token and updates jobs.
  console.log('bearer sees location')
  console.log(location)
  let path = location.pathname
  if (path.includes('?token=')){
    console.log('token exists in path')
    let match = /token=+(.*)/
    let token = match.exec(path)[1]
    console.log(token)
    _setToken(token)
  } else {
    // let token = getToken()
    let ptoken = getToken()
    ptoken.then(function(token){
      console.log('bearer sees token')
      console.log(token)
      // let tokenPath = path + '?token=' + token
      console.log('setting token')
      _setToken(token)
      console.log('fetching jobs')
      fetchJobs(token, dispatch)
    })
  }
}

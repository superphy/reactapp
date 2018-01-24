import axios from 'axios'
import { API_ROOT } from '../middleware/api'
import { fetchJobs } from '../middleware/accounts'

const fetchToken = () => {
  // Fetches token from the server.
  let ptoken = axios.get(API_ROOT + 'accounts')
    .then(response => {
      console.log(response)
      let token = response.data
      return token
    })
  return ptoken
}

const getToken = (pathname) => {
  // Retrieves token from the uri path.
  console.log(pathname)
  let match = /token=+(.*)/
  if (match.test(pathname)){
    let token = match.exec(pathname)[1]
    return token
  } else {
    // Returns blank for App paths.
    return ''
  }
}

export const tokenPostfix = (pathname) => {
  // Helper function to create token postfixes for Links & Redirects
  let token = getToken(pathname)
  if (token !== ''){
    return '?token=' + token
  } else {
    return ''
  }
}

export const bearer = (location, _setToken, dispatch, jobs) => {
  // Retrieves the custom bearer token and updates jobs.
  console.log('bearer sees location')
  console.log(location)
  let path = location.pathname
  if (path.includes('?token=')){
    console.log('token exists in path')
    let token = getToken(path)
    console.log(token)
    _setToken(token)
    console.log('fetching jobs')
    fetchJobs(token, dispatch, jobs)
  } else {
    console.log('requesting token')
    let ptoken = fetchToken()
    ptoken.then(function(token){
      console.log('bearer sees token')
      console.log(token)
      console.log('setting token')
      _setToken(token)
      console.log('fetching jobs')
      fetchJobs(token, dispatch, jobs)
    })
  }
}

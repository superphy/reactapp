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

const match = /token=+(.*)/

const getToken = (pathname) => {
  // Retrieves token from the uri path.
  let token = match.exec(pathname)[1]
  return token
}

const hasToken = (pathname) => {
  return match.test(pathname)
}

const tokenPostfix = (token) => {
  // Helper function to create token postfixes for Links & Redirects
  return '?token=' + token
}

export const tokenTo = (pathname, token) => {
  return pathname + tokenPostfix(token)
}

export const bearer = (location, _setToken, dispatch, jobs) => {
  // Retrieves the custom bearer token and updates jobs.
  console.log('bearer sees location')
  console.log(location)
  // We use 'href' instead of 'pathname' as 'href' includes the token signature.
  let path = location.href
  if (hasToken(path)){
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

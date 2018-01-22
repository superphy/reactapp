import axios from 'axios'
import { API_ROOT } from '../middleware/api'

const getToken = () => {
  let ptoken = axios.get(API_ROOT + 'accounts')
    .then(response => {
      console.log(response)
      let token = response.data
      return token
    })
  return ptoken
}

export const bearer = (location, _setToken) => {
  // Retrieves the custom bearer token and updates path.
  console.log('bearer sees location')
  console.log(location)
  let path = location.pathname
  if (path.includes('?token=')){
    //TODO: read token from path
    console.log('token exists in path')
  } else {
    // let token = getToken()
    let ptoken = getToken()
    ptoken.then(function(token){
      console.log('bearer sees token')
      console.log(token)
      // let tokenPath = path + '?token=' + token
      _setToken(token)
    })
  }
}

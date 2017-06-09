import { combineReducers } from 'redux'
import jobs from './jobs'

// this is currently redundant because we only have one reducer
const spfyApp = combineReducers({
  jobs
})

export default spfyApp

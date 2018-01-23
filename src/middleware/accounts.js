import axios from 'axios'
import { API_ROOT } from '../middleware/api'
import { addJob } from '../actions'

export const saveStore = ( store, access_token ) => {
  console.log('Store is: ')
  console.log(store)
  let promise = axios.post(API_ROOT + 'secured/accounts/update', store, { headers: { Authorization: `Bearer ${access_token}` }})
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(error => {
      console.log(error);
      return error
    });
  return promise
}

const fetchStore = ( access_token ) => {
  const url = `${API_ROOT}secured/accounts/find`;
  let promise = axios.get(url, { headers: { Authorization: `Bearer ${access_token}` }})
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(error => {
      console.log(error);
      return error
    });
  return promise
}

const hashList = ( jobs ) => {
  // Creates an array of job hashs for comparison.
  let l = []
  for (let job in jobs){
    l.push(job.hash)
  }
  return l
}

export const fetchJobs = (access_token, dispatch, jobs) => {
  console.log('fetching...')
  let promise = fetchStore(access_token)
  promise.then((response) => {
    // Grab the browser's current jobs store and create an array of job hashes.
    let currentJobs = hashList(jobs)
    console.log('fetch response: ', response)
    console.log('jobs:')
    for (let i in response){
      console.log('i', i)
      let job = response[i]
      console.log(job)
      if (job.hash !== undefined && !(job.hash in currentJobs)){
        console.log('job has hash and not currently present, pushing...')
        dispatch(addJob(
          job.hash,
          job.analysis,
          job.date,
          job.description
        ))
      } else {
        console.log('job doesnt have a hash, pass')
      }

    }
  })
}

export const handleBackup = (jobs, access_token) => {
  let promise = saveStore(jobs, access_token)
  promise.then((response) => {
    console.log('backup response: ', response)
    if (response === 'true'){
      this.setState({response: 'success!'})
    }
    else {
      this.setState({response: response})
    }
  })
}

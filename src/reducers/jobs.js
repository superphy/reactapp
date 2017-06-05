const job = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_JOB':
      return {
        id: action.id,
        hash: action.hash
      }
    default:
      return state
  }
}

const jobs = (state = [], action) => {
  switch (action.type){
    case 'ADD_JOB':
      return [
        ...state,
        job(undefined, action)
      ]
    default:
      return state
  }
}

export default jobs

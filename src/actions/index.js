let nextJobId = 0
export const addJob = (hash) => {
  return {
    type: 'ADD_JOB',
    id: nextJobId++,
    hash
  }
}

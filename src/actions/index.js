let nextJobId = 0
export const addJob = (hash, analysis, date, description) => {
  return {
    type: 'ADD_JOB',
    id: nextJobId++,
    hash,
    analysis,
    date,
    description
  }
}

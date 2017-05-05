import * as types from '../constants/ActionTypes'

const setRelationUnsafe = relation => ({
  type: types.SET_RELATION,
  relation: relation,
  attribute: ""
})

export const setRelation = relation => dispatch => {
  dispatch(setRelationUnsafe(relation))
}

import undoable from 'redux-undo'
import { SET_RELATION, SET_ATTRIBUTE } from '../actions/group'

const initialStateAttribute = {
  relation: "",
  attribute: ""
}

const attribute = (state = initialStateAttribute, action) => {
  switch (action.type){
    case SET_RELATION:
      return {
        relation: action.relation,
        attribute: state.attribute
      }
    case SET_ATTRIBUTE:
      return {
        relation: state.relation,
        attribute: action.attribute
      }
    default:
      return state
  }
}

export const undoableAttribute = undoable(attribute)

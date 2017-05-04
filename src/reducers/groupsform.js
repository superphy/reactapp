import { ADD_ATTRIBUTE, DELETE_ATTRIBUTE, EDIT_ATTRIBUTE } from '../actions/groupsform';

const initialState = {
  group1: [
    {
      relation: null,
      attribute: null,
      negated: false,
      logical: null,
    }
  ],
  group2: [
    {
      relation: null,
      attribute: null,
      negated: false,
      logical: null
    }
  ]
}
export default function groupsform(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTRIBUTE:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ]

    case DELETE_ATTRIBUTE:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_ATTRIBUTE:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    default:
      return state
  }
}

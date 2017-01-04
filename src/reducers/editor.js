import {
  SET_EDITOR,
} from '../actions/editor'

const editor = (state = {
  editor: null,
}, action) => {
  switch (action.type) {
    case SET_EDITOR:
      return {
        ...state,
        editor: action.editor,
      }
    default:
      return state
  }
}

export default editor
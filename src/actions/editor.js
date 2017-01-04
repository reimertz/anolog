export const SET_EDITOR = 'SET_EDITOR'

const updateEditor = editor => ({
  type: SET_EDITOR,
  editor
})

export const setEditor = (editor) => async dispatch => {
  return dispatch(updateEditor(editor))
}
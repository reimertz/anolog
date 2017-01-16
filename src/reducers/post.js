import {
  FETCHING_POST,
  DONE_FETCHING_POST,

  UPLOADING_POST,
  DONE_UPLOADING_POST
} from '../actions/post'

const post = (state = {
  isFetching: false,
  isPosting: false,
  post: false,
}, action) => {
  switch (action.type) {
    case FETCHING_POST:
      return {
        ...state,
        isFetching: true,
      }
    case DONE_FETCHING_POST:
      return {
        ...state,
        isFetching: false,
        post: action.post,
      }
    case UPLOADING_POST:
      return {
        ...state,
        isPosting: true,
      }
    case DONE_UPLOADING_POST:
      return {
        ...state,
        post: action.post,
        isPosting: false,
        publishedAt: action.publishedAt,
      }
    default:
      return state
  }
}

export default post
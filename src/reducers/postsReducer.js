/**
 * Import the actions for the switch cases
 * Set inital state
 * Reducer function - determines changes to the app state
 */
import {
  POSTS_PROGRESS,
  POSTS_SUCCESS,
  POSTS_ERROR,
} from "./../actions/postsActions";

const initialState = {
  pending: false,
  posts: [],
  error: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_PROGRESS:
      return {
        ...state,
        pending: true,
      };
    case POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        posts: action.posts,
      };
    case POSTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

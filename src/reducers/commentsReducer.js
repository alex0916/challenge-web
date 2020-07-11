/**
 * Import the actions for the switch cases
 * Set inital state
 * Reducer function - determines changes to the app state
 */
import {
  COMMENTS_PROGRESS,
  COMMENTS_SUCCESS,
  COMMENTS_ERROR,
} from "./../actions/commentsActions";

const initialState = {
  pending: false,
  comments: [],
  error: null,
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_PROGRESS:
      return {
        ...state,
        pending: true,
      };
    case COMMENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        comments: action.comments,
      };
    case COMMENTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

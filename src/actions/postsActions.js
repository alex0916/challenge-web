/**
 * Action constants
 */
export const POSTS_PROGRESS = "POSTS_PROGRESS";
export const POSTS_SUCCESS = "POSTS_SUCCESS";
export const POSTS_ERROR = "POSTS_ERROR";

/**
 * Actions for the reducer
 */
function postsProgress() {
  return {
    type: POSTS_PROGRESS,
  };
}

function postsSuccess(posts) {
  return {
    type: POSTS_SUCCESS,
    posts,
  };
}

function postsError(error) {
  return {
    type: POSTS_ERROR,
    error,
  };
}

/**
 * Retrieve API posts and update state
 */
export default function getPosts() {
  return (dispatch) => {
    dispatch(postsProgress());
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => {
        dispatch(postsSuccess(res));
      })
      .catch((error) => {
        dispatch(postsError(error));
      });
  };
}

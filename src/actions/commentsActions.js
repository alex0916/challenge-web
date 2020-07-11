/**
 * Action constants
 */
export const COMMENTS_PROGRESS = "COMMENTS_PROGRESS";
export const COMMENTS_SUCCESS = "COMMENTS_SUCCESS";
export const COMMENTS_ERROR = "COMMENTS_ERROR";

/**
 * Actions for the reducer
 */
const commentsProgress = () => {
  return {
    type: COMMENTS_PROGRESS,
  };
};

const commentsSuccess = (comments) => {
  return {
    type: COMMENTS_SUCCESS,
    comments,
  };
};

const commentsError = (error) => {
  return {
    type: COMMENTS_ERROR,
    error,
  };
};

/**
 * Retrieve API comments and update state
 * @param {*} id post id 
 */
export default function getComments(id) {
  return (dispatch) => {
    dispatch(commentsProgress());
    fetch("https://jsonplaceholder.typicode.com/comments?postId=" + id)
      .then((res) => res.json())
      .then((res) => {
        dispatch(commentsSuccess(res));
      })
      .catch((error) => {
        dispatch(commentsError(error));
      });
  };
}

import axios from "axios";

import {
  ADD_REVIEW,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_REVIEWS,
  GET_REVIEW,
  REVIEW_LOADING,
  DELETE_REVIEW
} from "./types";

// Add Review
export const addReview = reviewData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/reviews", reviewData)
    .then(res =>
      dispatch({
        type: ADD_REVIEW,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Reviews
export const getReviews = () => dispatch => {
  dispatch(setReviewLoading());
  axios
    .get("/api/reviews")
    .then(res =>
      dispatch({
        type: GET_REVIEWS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REVIEWS,
        payload: null
      })
    );
};

// Get Review
export const getReview = id => dispatch => {
  dispatch(setReviewLoading());
  axios
    .get(`/api/reviews/${id}`)
    .then(res =>
      dispatch({
        type: GET_REVIEW,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REVIEW,
        payload: null
      })
    );
};

// Delete Review
export const deleteReview = id => dispatch => {
  axios
    .delete(`/api/reviews/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_REVIEW,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Useful
export const addUseful = id => dispatch => {
  axios
    .post(`/api/reviews/useful/${id}`)
    .then(res => dispatch(getReviews()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Cool
export const addCool = id => dispatch => {
  axios
    .post(`/api/reviews/cool/${id}`)
    .then(res => dispatch(getReviews()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Funny
export const addFunny = id => dispatch => {
  axios
    .post(`/api/reviews/funny/${id}`)
    .then(res => dispatch(getReviews()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setReviewLoading = () => {
  return {
    type: REVIEW_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

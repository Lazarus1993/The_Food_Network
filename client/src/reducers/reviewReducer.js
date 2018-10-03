import {
  ADD_REVIEW,
  GET_REVIEWS,
  GET_REVIEW,
  DELETE_REVIEW,
  REVIEW_LOADING
} from "../actions/types";

const initialState = {
  reviews: [],
  review: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REVIEW_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false
      };
    case GET_REVIEW:
      return {
        ...state,
        REVIEW: action.payload,
        loading: false
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews]
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload)
      };
    default:
      return state;
  }
}

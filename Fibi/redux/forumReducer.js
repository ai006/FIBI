import {FETCH_QUESTIONS_PENDING, FETCH_QUESTIONS_ERROR, FETCH_QUESTIONS_SUCCESS  } from './actions/types';


//Object for the forum state
const initialState = {
  pending: false,
  forum: [],
  error: "no errors"
}

//the reducer for fetching all the question in the forum
export default function forumReducer(state = initialState, action) {  
  switch (action.type) {
      case FETCH_QUESTIONS_ERROR:
        return {
          ...state,
          pending: false,
          error:  action.error
        }
      case FETCH_QUESTIONS_PENDING:
        return {
          ...state,
          pending: true
        }
      case FETCH_QUESTIONS_SUCCESS:
        return{
          ...state,
          pending: false,
          forum: action.forum
        }
      default:
        return state;
  }
}
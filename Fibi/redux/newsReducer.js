import {FETCH_NEWS_PENDING, FETCH_NEWS_ERROR, FETCH_NEWS_SUCCESS } from './actions/types';


//Object for the type of Jobs state
const initialState = {
  pending: false,
  news: [],
  error: "no errors"
}

//the reducer for fetching all the news in the database
export default function newsReducer(state = initialState, action) {  
  switch (action.type) {
      case FETCH_NEWS_ERROR:
        return {
          ...state,
          pending: false,
          error:  action.error
        }
      case FETCH_NEWS_PENDING:
        return {
          ...state,
          pending: true
        }
      case FETCH_NEWS_SUCCESS:
        return{
          ...state,
          pending: false,
          news: action.news
        }
      default:
        return state;
  }
}
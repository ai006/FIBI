import {FETCH_NEWS_PENDING, FETCH_NEWS_ERROR, FETCH_NEWS_SUCCESS } from './actions/types';


//Object for news state in redux
const initialState = {
  pending: false,
  news: [],
  error: "no errors"
}

//the reducer for fetching all the news in the database
export default function newsReducer(state = initialState, action) {  
  switch (action.type) {
      case FETCH_NEWS_ERROR:    //when fetching is not successful
        return {
          ...state,
          pending: false,
          error:  action.error
        }
      case FETCH_NEWS_PENDING:  //when fetching just started 
        return {
          ...state,
          pending: true
        }
      case FETCH_NEWS_SUCCESS:  //when fetching is successful
        return{
          ...state,
          pending: false,
          news: action.news
        }
      default:
        return state;
  }
}
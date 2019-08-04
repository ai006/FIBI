import {FETCH_JOBS_PENDING,FETCH_JOBS_ERROR,FETCH_JOBS_SUCCESS } from '../actions/types';

const initialState = {
  pending: false,
  jobs: [],
  error: "no errors"
}

export default function jobsReducer(state = initialState, action) {  
  //console.log(action.jobs)
  switch (action.type) {
      case FETCH_JOBS_ERROR:
        return {
          ...state,
          pending: false,
          error:  action.error
        }
      case FETCH_JOBS_PENDING:
        return {
          ...state,
          pending: true
        }
      case FETCH_JOBS_SUCCESS:
        return{
          ...state,
          pending: false,
          jobs: action.jobs
        }
      default:
        return state;
  }
}
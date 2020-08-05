import {FETCH_JOBS_PENDING,FETCH_JOBS_ERROR,FETCH_JOBS_SUCCESS } from './actions/types';


//Object for the Jobs state
const initialState = {
  pending: false,
  jobs: [],
  error: "no errors"
}

//the reducer for fetching all the jobs in the DB
export default function jobsReducer(state = initialState, action) {  

  switch (action.type) {
      case FETCH_JOBS_ERROR:    //when fetching jobs fails
        return {
          ...state,
          pending: false,
          error:  action.error
        }
      case FETCH_JOBS_PENDING:  //when fetching jobs just started or is pending
        return {
          ...state,
          pending: true
        }
      case FETCH_JOBS_SUCCESS:  //when fetching jobs is successful
        return{
          ...state,
          pending: false,
          jobs: action.jobs
        }
      default:
        return state;
  }
}
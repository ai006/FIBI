import {FETCH_JOB_TYPES_PENDING, FETCH_JOB_TYPES_ERROR, FETCH_JOB_TYPES_SUCCESS } from './actions/types';


//Object for all the job types and forum topics
const initialState = {
  pending: false,
  jobTypes: [],
  error: "no errors"
}

//the reducer for fetching all the job types in the database
export default function jobTypesReducer(state = initialState, action) {  
  switch (action.type) {
      case FETCH_JOB_TYPES_ERROR:     //when fetching is not successful
        return {
          ...state,
          pending: false,
          error:  action.error
        }
      case FETCH_JOB_TYPES_PENDING:   //when fetching just started or is pending
        return {
          ...state,
          pending: true
        }
      case FETCH_JOB_TYPES_SUCCESS:   //when fetching is successful
        return{
          ...state,
          pending: false,
          jobTypes: action.jobTypes
        }
      default:
        return state;
  }
}
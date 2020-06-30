import {FETCH_JOB_TYPES_PENDING, FETCH_JOB_TYPES_ERROR, FETCH_JOB_TYPES_SUCCESS } from './actions/types';


//Object for the type of Jobs state
const initialState = {
  pending: false,
  jobTypes: [],
  error: "no errors"
}

//the reducer for fetching all the job types in the database
export default function jobTypesReducer(state = initialState, action) {  
  switch (action.type) {
      case FETCH_JOB_TYPES_ERROR:
        return {
          ...state,
          pending: false,
          error:  action.error
        }
      case FETCH_JOB_TYPES_PENDING:
        return {
          ...state,
          pending: true
        }
      case FETCH_JOB_TYPES_SUCCESS:
        return{
          ...state,
          pending: false,
          jobTypes: action.jobTypes
        }
      default:
        return state;
  }
}
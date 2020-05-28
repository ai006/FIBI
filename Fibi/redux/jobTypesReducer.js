import {FETCH_JOB_TYPES_PENDING, FETCH_JOB_TYPES_ERROR, FETCH_JOB_TYPES_SUCCESS } from './actions/types';


//Object for the Jobs state
const initialState = {
  pending: false,
  jobTypes: [],
  error: "no errors"
}

export default function jobTypesReducer(state = initialState, action) {  
  //console.log(action.jobs)
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
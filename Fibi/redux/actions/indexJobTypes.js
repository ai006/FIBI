import {FETCH_JOB_TYPES_PENDING, FETCH_JOB_TYPES_ERROR, FETCH_JOB_TYPES_SUCCESS } from './types';

//redux actions
export const fetchJobTypesPending = () => {
  return {
    type: FETCH_JOB_TYPES_PENDING
  }
};

export const fetchJobTypesError = (error) => {
  return {
    type: FETCH_JOB_TYPES_ERROR,
    error:error
  }
};

export const fetchJobTypesSuccess = (data) => {
  return {
    type: FETCH_JOB_TYPES_SUCCESS,
    jobTypes:   data
  }
}


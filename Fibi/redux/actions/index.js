import {FETCH_JOBS_PENDING, FETCH_JOBS_ERROR, FETCH_JOBS_SUCCESS } from './types';

//redux actions
export const fetchJobsPending = () => {
  return {
    type: FETCH_JOBS_PENDING
  }
};

export const fetchJobsError = (error) => {
  return {
    type: FETCH_JOBS_ERROR,
    error:error
  }
};

export const fetchJobSuccess = (data) => {
  return {
    type: FETCH_JOBS_SUCCESS,
    jobs:data
  }
}


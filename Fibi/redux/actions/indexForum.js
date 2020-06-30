import {FETCH_QUESTIONS_PENDING, FETCH_QUESTIONS_ERROR, FETCH_QUESTIONS_SUCCESS } from './types';

//redux actions
export const fetchForumPending = () => {
  return {
    type: FETCH_QUESTIONS_PENDING
  }
};

export const fetchForumError = (error) => {
  return {
    type: FETCH_QUESTIONS_ERROR,
    error:error
  }
};

export const fetchForumSuccess = (data) => {
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    forum :data
  }
}


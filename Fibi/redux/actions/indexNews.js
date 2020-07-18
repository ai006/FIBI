import {FETCH_NEWS_PENDING, FETCH_NEWS_ERROR, FETCH_NEWS_SUCCESS } from './types';

//redux actions
export const fetchNewsPending = () => {
  return {
    type: FETCH_NEWS_PENDING
  }
};

export const fetchNewsError = (error) => {
  return {
    type: FETCH_NEWS_ERROR,
    error:error
  }
};

export const fetchNewsSuccess = (data) => {
  return {
    type: FETCH_NEWS_SUCCESS,
    news:   data
  }
}


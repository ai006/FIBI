import {FETCH_QUESTIONS_PENDING, FETCH_QUESTIONS_ERROR, 
        FETCH_QUESTIONS_SUCCESS,ADD_FORUM_QUESTION,
        DELETE_FORUM_QUESTION, INSERT_FORUM_QUESTION } from './types';

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

export const addForumQuestion = (data) => {
  return {
    type: ADD_FORUM_QUESTION,
    question : data
  }
}

export const deleteForumQuestion = (idNumber) => {
  return {
    type: DELETE_FORUM_QUESTION,
    idNum : idNumber
  }
}


export const insertForumQuestion = (idNumber, question) => {
  return {
    type: INSERT_FORUM_QUESTION,
    idNum : idNumber,
    inquiry : question
  }
}

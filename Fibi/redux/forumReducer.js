import {FETCH_QUESTIONS_PENDING, FETCH_QUESTIONS_ERROR, 
        ADD_FORUM_QUESTION, FETCH_QUESTIONS_SUCCESS,
        DELETE_FORUM_QUESTION, INSERT_FORUM_QUESTION} from './actions/types';


//Object for the forum state
const initialState = {
  pending: false,
  forum: [],
  error: "no errors"
}

//the reducer for fetching all the question in the forum
export default function forumReducer(state = initialState, action) {  
  switch (action.type) {
      case FETCH_QUESTIONS_ERROR:       //when fetching is not successful
        return {
          ...state,
          pending: false,
          error:  action.error
        }
      case FETCH_QUESTIONS_PENDING:     //when fetching has just started
        return {
          ...state,
          pending: true
        }
      case FETCH_QUESTIONS_SUCCESS:     //when fetching is successful
        return{
          ...state,
          pending: false,
          forum: action.forum
        }
      case ADD_FORUM_QUESTION:        //pushing a user asked question to redux
        return {
          ...state,
          forum : [...state.forum, action.question]
        }
      case DELETE_FORUM_QUESTION:     //handle deleting a user asked question
        return {
          ...state,
          forum:[...state.forum.slice(0, action.idNum),...state.forum.slice(action.idNum + 1)]
        }
      case INSERT_FORUM_QUESTION:     //handle insert a user asked question
        return {
          ...state,
          forum:[...state.forum.slice(0,action.idNum), action.inquiry, ...state.forum.slice(action.idNum)]
        }
      default:
        return state;
  }
}
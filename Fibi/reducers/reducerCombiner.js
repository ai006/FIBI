import { combineReducers } from 'redux';
import jobs from './jobsReducer';

export default combineReducers({
    data: jobs
});
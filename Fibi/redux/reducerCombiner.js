import { combineReducers } from 'redux';
import jobs from './jobsReducer';
import jobTypes from './jobTypesReducer';

//area to combine all the reducers
//and have it as just one big object
export default combineReducers({
    data: jobs,
    jobType : jobTypes
});
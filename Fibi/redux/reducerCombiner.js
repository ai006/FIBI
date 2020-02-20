import { combineReducers } from 'redux';
import jobs from './jobsReducer';

//area to combine all the reducers
//and have it as just one big object
export default combineReducers({
    data: jobs
});
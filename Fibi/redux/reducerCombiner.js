import { combineReducers } from 'redux';
import jobs from './jobsReducer';
import jobTypes from './jobTypesReducer';
import questions from './forumReducer';

//area to combine all the reducers
//and have it as just one big object
export default combineReducers({
    data: jobs,                     //all the jobs in the database
    jobType : jobTypes,             //all the type of jobs in database e.g. accounting
    forum : questions               //all the questions asked in the forum
});

//The redux looks roughly like this
/*
{
    data:{
        pending: "",
        jobs: [ ],
        error: " "
    },
    jobType: {
        pending: "",
        jobTypes: [],
        error: "",
    },
    forum : {
        pending: "",
        forum: [],
        error: "",
    }
}
*/
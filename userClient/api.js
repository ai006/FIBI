import {fetchJobsPending, fetchJobsError, fetchJobSuccess} from './actions/index';



const API_URL = 'http://10.0.2.2:3001/api/getData';


export const fetchJobsData =  () => {
    return async (dispatch) => {
      try{
        dispatch(fetchJobsPending())
        const response = await fetch(API_URL);
        const responseJson = await response.json();
        if(responseJson.message !== undefined){
          throw(responseJson.message)
        }
        dispatch(fetchJobSuccess(responseJson.data))
      }catch(error){
        //console.log(error);
        dispatch(fetchJobsError(error))
      }
    }
}
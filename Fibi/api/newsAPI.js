import {fetchNewsPending, fetchNewsSuccess, fetchNewsError} from '../redux/actions/indexNews';


//URL address used to fetch/call the server on heroku to fetch jobs
const API_URL = 'https://desolate-tor-37189.herokuapp.com/api/getData';

//The base link for the API
const API_Link = 'https://desolate-tor-37189.herokuapp.com/api/';

//the IP 10.2.2 is the default IP address used to connect android devices to your local host
//const API_URL = 'http://10.0.2.2:3001/api/getData';


//URL address used to send data of new job to Heroku server 
const API_URL_USER = 'https://desolate-tor-37189.herokuapp.com/api/userAddedJob';
//const API_URL_USER = 'http://10.0.2.2:5000/api/userAddedJob';



//function used to call and fetch all the forum questions from the server
export const fetchNewsData =  () => {
    return async (dispatch) => {
      try{
        dispatch(fetchNewsPending())
        const response = await fetch(API_Link + 'getNews');
        const responseJson = await response.json();
        if(responseJson.message !== undefined){
          throw(responseJson.message)
        }
        dispatch(fetchNewsSuccess(responseJson.data))
      }catch(error){
        //console.log(error);
        dispatch(fetchNewsError(error))
      }
    }
}
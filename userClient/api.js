import {fetchJobsPending, fetchJobsError, fetchJobSuccess} from './actions/index';
import { Alert} from 'react-native'


const API_URL = 'http://10.0.2.2:3001/api/getData';

const API_URL_USER = 'http://10.0.2.2:3001/api/userAddedJob';


//function used to call and fetch the jobs data from the server
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


  /*function used to send jobs added by user to the server.
  the fuction is wrapped in a try and catch bloc,
  when server receives the data it responds with 
  a boolean variable "success" set to true. 
  if it fails it responds with two variables 
  boolean "success" set to false and string 
  "error" which contains a message.*/ 
  export const sendAddedJob = async (data) => {
    try{
      const response = await fetch(API_URL_USER, {              //sends the data to server
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ data }),                         //body contains all the data from user
      });

      const responseJson = await response.json();              //response from server turned to JSON 
                                                               //with only the needed variables
      
      if(responseJson.success) {                              //if sending data was successful 
        Alert.alert(                                          //alert user with a thank you   
          'Job sent and saved!',                              //message
          'Thank you! :)',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
        return true;                                           //return true to UserAddJob 
      }
      
    const errMessage = await response.responseJson;           //get the error message from server          
    throw new Error(errMessage);                              //throw error message
    
    } catch(errMessage){                                      //catch the error 
      Alert.alert(
        'Status: error',                                      //alert user the job was not saved by server
        'Something went wrong please try again :)',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      return false;                                             //return false to UserAddJob
    }
    
  }



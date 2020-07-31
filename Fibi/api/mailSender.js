import { Alert} from 'react-native'

const API_URL_INFO = 'https://desolate-tor-37189.herokuapp.com/api/sendmail';
//const API_URL_INFO = 'http://10.0.2.2:5000/api/sendmail';

export const mailSender = async (data,type) => {
    
    try{
      const response = await fetch(API_URL_INFO, {              //sends the data to server
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ data, type }),                         //body contains all the data from user
      });

      const responseJson = await response.json();              //response from server turned to JSON 
                                                               //with only the needed variables

      if(responseJson.success) {                              //if sending data was successful 
        return true;                                           //return true to UserAddJob 
      }
      
    const errMessage = await response.responseJson;           //get the error message from server          
    
    throw new Error(errMessage);                              //throw error message
    
    } catch(errMessage){                                      //catch the error 
        return false;                                             //return false to UserAddJob
    }
    
  }
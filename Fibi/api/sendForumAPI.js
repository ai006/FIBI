import { Alert} from 'react-native'

//URL address used to fetch/call the server on heroku to fetch jobs
// const API_URL = 'https://desolate-tor-37189.herokuapp.com/api/getData';

 //The base link for the API
 const API_Link = 'https://desolate-tor-37189.herokuapp.com/api/';

//the IP 10.2.2 is the default IP address used to connect android devices to your local host
const API_URL = 'http://10.0.2.2:5000/api/';


//URL address used to send data of new job to Heroku server 
const API_URL_USER = 'https://desolate-tor-37189.herokuapp.com/api/userAddedJob';
//const API_URL_USER = 'http://10.0.2.2:5000/api/userAddedJob';


/*function used to send forum questions or answers to the server.
  the fuction is wrapped in a try and catch block,
  when server receives the data it responds with 
  a boolean variable "success" set to true. 
  if it fails it responds with two variables 
  boolean "success" set to false and string 
  "error" which contains a message.*/ 
  export const sendForumData = async (data, type) => {
    
    try{
      const response = await fetch(API_Link + 'addForumData', {              //sends the data to server
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ data,type }),                         //body contains all the data from user
      });

      const responseJson = await response.json();              //response from server turned to JSON 
                                                               //with only the needed variables

      if(responseJson.success) {                              //if sending data was successful 
        Alert.alert(                                          //alert user with a thank you   
          'input sent and saved!',                              //message
          'your input will be checked for profanity before posting. Thank you! :)',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
        return true;                                           //return true to component or class that called the function 
      }
      
    const errMessage = await response.responseJson;           //get the error message from server          
    throw new Error(errMessage);                              //throw error message
    
    } catch(errMessage){                                      //catch the error 
      Alert.alert(
        'Status: error',                                      //alert user their input was not saved by server
        'Something went wrong please try again :)',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      return false;                                             //return false to component or class that called the function 
    }
    
  }
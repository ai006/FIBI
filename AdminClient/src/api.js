import axios from 'axios';


//IP address for connecting to the localhost
const API_URL_LOCALHOST = 'http://localhost:3001/'

//IP address or URL for connecting to the server
const API_URL = 'https://desolate-tor-37189.herokuapp.com/'


// our first get method that uses our backend api to
// fetch data from our data base
export const fetchData = async () => {
    const response = await fetch(API_URL_LOCALHOST + 'api/getData');
    const {data} = await response.json();
    return data;
}

// our put method that uses our backend api
// to create new query into our data base
//add all the information from variables to JSON to send POST request to server
export const addDataToDB = async (id, data) => {
    axios.post(API_URL_LOCALHOST + 'api/putData', {
      id: id,
      job : {
        id:id,
        CompanyName : data.CompanyName,
        logo : data.logo,
        educationLevel : data.educationLevel,
        address :{
          city   : data.address.city,
          cityArr: data.address.cityArr,
          country: data.address.country,
          countryArr: data.address.countryArr,
        },
        link: data.link,
        jobs: data.jobs,
        jobsArr: data.jobsArr,
        about: data.about,
      }
    });
    return
}

// our delete method that uses our backend api
  // to remove existing database information
export const deleteDataFromDB = async (id) => {
    axios.delete(API_URL_LOCALHOST + 'api/deleteData', {
        data: {id: id,},
    });
    return
}

  // our update method that uses our backend api
  // to overwrite existing data base information
export const updateDataInDB = async (id, messageUpdate) => {
    axios.post(API_URL_LOCALHOST + 'api/updateData', {
        id: id,
        update: messageUpdate,
      });
      return
}
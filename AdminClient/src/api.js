import axios from 'axios';

// our first get method that uses our backend api to
// fetch data from our data base
export const fetchData = async () => {
    const response = await fetch('https://desolate-tor-37189.herokuapp.com/api/getData')
    const {data} = await response.json()
    return data
}

// our put method that uses our backend api
// to create new query into our data base
export const addDataToDB = async (id, data) => {
    axios.post('https://desolate-tor-37189.herokuapp.com/api/putData', {
      id: id,
      job : {
        id:id,
        CompanyName : data.CompanyName,
        logo : data.logo,
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
    axios.delete('https://desolate-tor-37189.herokuapp.com/api/deleteData', {
        data: {id: id,},
    });
    return
}

  // our update method that uses our backend api
  // to overwrite existing data base information
export const updateDataInDB = async (id, messageUpdate) => {
    axios.post('https://desolate-tor-37189.herokuapp.com/api/updateData', {
        id: id,
        update: messageUpdate,
      });
      return
}
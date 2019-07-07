import axios from 'axios';

// our first get method that uses our backend api to
// fetch data from our data base
export const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/getData')
    const {data} = await response.json()
    return data
}

// our put method that uses our backend api
// to create new query into our data base
export const addDataToDB = async (id, message) => {
    axios.post('http://localhost:3001/api/putData', {
      id: id,
      message: message,
    });
    return
}

// our delete method that uses our backend api
  // to remove existing database information
export const deleteDataFromDB = async (id) => {
    axios.delete('http://localhost:3001/api/deleteData', {
        data: {id: id,},
    });
    return
}

  // our update method that uses our backend api
  // to overwrite existing data base information
export const updateDataInDB = async (id, messageUpdate) => {
    axios.post('http://localhost:3001/api/updateData', {
        id: id,
        update: { message: messageUpdate },
      });
      return
}
// /client/App.js
import React, { Component } from 'react';

import {fetchData,addDataToDB, deleteDataFromDB, updateDataInDB} from './api'
import DeleteData from './DeleteData'
import AddData from './AddData'
import UpdateData from './UpdateData'
import './Styles.css'


class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    loaded: false,
  };

  
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    console.log("Fetching data...");
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval }); //any int assigned to a bool not 0 is true
    }
    
     // setInterval(this.printData,1000)
   
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    console.log("unmounted interval...")
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null,loaded:false });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base

  getDataFromDb = async () => {
      const data  = await fetchData()
      this.setState({data:data,loaded:true})
  }

  printData= () => {
    console.log(this.state.data)
  }



  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);//gets all IDs in data and adds to array
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      idToBeAdded++;
    }
    addDataToDB(idToBeAdded,message)
    this.setState({loaded:false})
  };

 // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    let tempIdToDelete = parseInt(idTodelete)
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === tempIdToDelete) {
        objIdToDelete = dat._id;
      }
    });
    deleteDataFromDB(objIdToDelete)
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    let tempIdToUpdate = parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === tempIdToUpdate) {
        objIdToUpdate = dat._id;
      }
    });
    updateDataInDB(objIdToUpdate,updateToApply)
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li key={dat.id} style={{ padding: '10px' }} >
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> data: </span>
                  {dat.message}
                </li>
              ))}
        </ul>
          <AddData add={this.putDataToDB}/>
          <DeleteData delete={this.deleteFromDB}/>
          <UpdateData update={this.updateDB}/>  
      </div>
    );
  }
}

export default App;
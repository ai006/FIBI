// /client/App.js
import React, { Component } from 'react';

import {fetchData,addDataToDB, deleteDataFromDB, updateDataInDB} from './api'
import DeleteData from './DeleteData'
import AddData from './AddData'
import UpdateData from './UpdateData'
import ListJob from './ListJob'
import './Styles.css'
import {updateValue} from './updater'


/* This class holds all the functions which are used to call the 
server.
it holds all the data from jobs in an array
This is also the first function which is called  */

class Jobs extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };


  //as soon as the component mounts fetch all the jobs from the server
  //this.getDataFromDb() is the function used to call the database
  componentDidMount() {
    console.log("Fetching data...");
    this.getDataFromDb();

    /*
     The code below calls the server every second
    */
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval }); //any int assigned to a bool not 0 is true
    // }
  }

  //When the component is unmounting clear everything
  componentWillUnmount() {
    console.log("unmounted interval...")
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      //this.setState({ intervalIsSet: null,loaded:false });
    }
  }

  //routine which calls the function fetchData from api.js
  //which is used to fetch jobs from the database
  getDataFromDb = async () => {
      const data  = await fetchData()
      this.setState({data:data})
      // this.printData()
  }

  //function to print the jobs in the database
  printData= () => {
    console.log(this.state.data)
  }

  //fuction which calls the routine addDataToDB from api.js
  //which is used to add a job to the database
  putDataToDB = (message) => {
    //console.log(message)
    let currentIds = this.state.data.map((data) => data.id);  //gets all IDs in database to find an unused ID
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      idToBeAdded++;
    }
    addDataToDB(idToBeAdded,message)
  };

  //function which calls the routine deleteDataFromDB from api.js
  //which is used to delete a job from the database
  deleteFromDB = (idTodelete) => {
    
    let tempIdToDelete = parseInt(idTodelete)
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
    if (dat.id === tempIdToDelete) {
        objIdToDelete = dat._id;
    }});
    deleteDataFromDB(objIdToDelete)
  };

  //function calls the routine updateDataInDB from api.js
  //which is used to update some info from a job in the database
  //the function updateValue() is used to update the JSON of
  //the old job with JSON of the new job
  updateDB = (update) => {
     let objIdToUpdate = null;
     let oldData = {};
     let tempIdToUpdate = parseInt(update.id);
     this.state.data.forEach((dat) => {
     if (dat.id === tempIdToUpdate) {
        objIdToUpdate = dat._id;
        oldData =  dat;
      }}); 
     updateDataInDB(objIdToUpdate,updateValue(oldData,update))
  };


  render() {
    const { data } = this.state;
    console.log(data.length + 'size')
    return (
      <div>
        <div>
         <h3>button to fetch the most up to date jobs from server</h3>
         <button onClick={this.getDataFromDb}>call server</button>
        </div>
        <div className='arrangeRow'>
          <div className='container'><AddData add={this.putDataToDB}/></div>
          <div className='container'><DeleteData delete={this.deleteFromDB}/></div>
          <div className='container'><UpdateData update={this.updateDB}/></div>  
        </div>
        {
          <ul>
            {data.length <= 0 ? 'NO DB ENTRIES YET' : data.map(job => <ListJob key={job.id} {...job}/>)}
          </ul>
        }
        
      </div>
    );
  }
}

export default Jobs;
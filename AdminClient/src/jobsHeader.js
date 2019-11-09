// /client/App.js
import React, { Component } from 'react';

import {fetchData,addDataToDB, deleteDataFromDB, updateDataInDB} from './api'
import DeleteData from './DeleteData'
import AddData from './AddData'
import UpdateData from './UpdateData'
import ListJob from './ListJob'
import './Styles.css'
import {updateValue} from './updater'


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

  componentDidMount() {
    console.log("Fetching data...");
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval }); //any int assigned to a bool not 0 is true
    }
  }

  componentWillUnmount() {
    console.log("unmounted interval...")
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      //this.setState({ intervalIsSet: null,loaded:false });
    }
  }

  getDataFromDb = async () => {
      const data  = await fetchData()
      this.setState({data:data})
      // this.printData()
  }

  printData= () => {
    console.log(this.state.data)
  }

  putDataToDB = (message) => {
    //console.log(message)
    let currentIds = this.state.data.map((data) => data.id);//gets all IDs in data and adds to array
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      idToBeAdded++;
    }
    addDataToDB(idToBeAdded,message)
  };
  
  deleteFromDB = (idTodelete) => {
    let tempIdToDelete = parseInt(idTodelete)
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
    if (dat.id === tempIdToDelete) {
        objIdToDelete = dat._id;
    }});
    deleteDataFromDB(objIdToDelete)
  };

  
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
    return (
      <div>
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
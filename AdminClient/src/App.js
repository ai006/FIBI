// /client/App.js
import React, { Component } from 'react';

import {fetchData,addDataToDB, deleteDataFromDB, updateDataInDB} from './api'
import DeleteData from './DeleteData'
import AddData from './AddData'
import UpdateData from './UpdateData'
import ListJob from './ListJob'
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
      this.setState({ intervalIsSet: null,loaded:false });
    }
  }

  getDataFromDb = async () => {
      const data  = await fetchData()
      this.setState({data:data,loaded:true})
  }

  printData= () => {
    console.log(this.state.data)
  }

  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);//gets all IDs in data and adds to array
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      idToBeAdded++;
    }
    addDataToDB(idToBeAdded,message)
    this.setState({loaded:false})
  };

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

  render() {
    const { data } = this.state;
    return (
      <div>
          <AddData add={this.putDataToDB}/>
          <DeleteData delete={this.deleteFromDB}/>
          <UpdateData update={this.updateDB}/>  
          <ul>
            {data.length <= 0 ? 'NO DB ENTRIES YET' : data.map(job => <ListJob {...job}/>)}
          </ul>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import './Styles.css'

import {deleteDataFromDB} from './api'

export default class DeleteData extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            data: this.props.myData,
        };
        console.log("In constructor")
    }
   
    handleIdChange = event => {
        this.setState({id: event.target.value})
    }

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
      console.log("id to delete "+ idTodelete)
      let tempIdToDelete = parseInt(idTodelete)
      let objIdToDelete = null;
      this.state.data.forEach((dat) => {
        if (dat.id === tempIdToDelete) {
          objIdToDelete = dat._id;
        }
      });
      console.log("object to delete "+ objIdToDelete)
      deleteDataFromDB(objIdToDelete)
  };

    render(){
        return(
            <div>
               <h1 className='colorOrange'>Delete data</h1> 
                <div>
                  <input
                    type="text" 
                    className='myWidth' 
                    placeholder="Enter id to delete"
                    value={this.state.id}
                    onChange={this.handleIdChange}
                  /> 
                  <button onClick={() => this.deleteFromDB(this.state.id)}>
                    Delete
                  </button> 
                </div>
            </div>
        )
    }
}

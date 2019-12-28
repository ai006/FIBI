import React, { Component } from 'react';
import './Styles.css'


//class used to delete a job from the database
export default class DeleteData extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',                       //id of job to delete
        };
        console.log("In constructor")
    }
   
    //function for handling input from user
    handleIdChange = event => {
        this.setState({id: event.target.value})
    }

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
      this.props.delete(idTodelete)
    };

    //display an input box to enter the ID number
    render(){
        return(
            <div>
              <div>
              <h3 className='colorBlue'>Delete data</h3> 
                <div>
                  <input
                    type="text" 
                    className='myWidth' 
                    placeholder="Enter id to delete"
                    value={this.state.id}
                    onChange={this.handleIdChange}
                  />
              </div>
                  <div className="MarginTop">
                    <button onClick={() => this.deleteFromDB(this.state.id)}>
                      Delete
                    </button> 
                  </div>
                </div>
            </div>
        )
    }
}
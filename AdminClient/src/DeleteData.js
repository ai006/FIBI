import React, { Component } from 'react';
import './Styles.css'

export default class DeleteData extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
        };
        console.log("In constructor")
    }
   
    handleIdChange = event => {
        this.setState({id: event.target.value})
    }

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
      this.props.delete(idTodelete)
    };

    render(){
        return(
            <div>
               <h3 className='colorOrange'>Delete data</h3> 
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
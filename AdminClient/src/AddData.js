import React, { Component } from 'react';
import './Styles.css'

export default class AddData extends Component {

    constructor(props){
        super(props);
        this.state = {
            message: '',
        };
        console.log("In constructor")
    }
   
    handleMessageChange = event => {
        this.setState({message: event.target.value})
    }

    // our delete method that uses our backend api
    // to remove existing database information
    putDataToDB = (message) => {
      this.props.add(message)
  };

    render(){
        return(
            <div>
                <h3 className='colorOrange'>ADD data</h3> 
                <input
                    type="text"
                    onChange={this.handleMessageChange}
                    value={this.state.message}
                    placeholder="add something in the database"
                    style={{ width: '200px' }}/>

                <button onClick={() => this.putDataToDB(this.state.message)}>
                    ADD
                </button>
            </div>
        )
    }
}

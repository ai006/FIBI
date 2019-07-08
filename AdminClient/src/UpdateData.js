import React, { Component } from 'react';
import './Styles.css'

export default class UpdateData extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            message: '',
        };
        console.log("In constructor")
    }
   
    handleMessageChange = event => {
        this.setState({message: event.target.value})
    }

    handleIdChange = event => {
        this.setState({id: event.target.value})
    }

    // our delete method that uses our backend api
    // to remove existing database information
    putDataToDB = (id,message) => {
      this.props.update(id,message)
    };

    render(){
        return(
            <div>
                <h3 className='colorOrange'>Update data</h3> 
                <input
                    type="text"
                    onChange={this.handleIdChange}
                    value={this.state.id}
                    placeholder="id of item to update here"
                    style={{ width: '200px' }}/>
                 <input
                    type="text"
                    onChange={this.handleMessageChange}
                    value={this.state.message}
                    placeholder="put new value of the item here"
                    style={{ width: '200px' }}/>
                <button onClick={() => this.putDataToDB(this.state.id,this.state.message)}>
                    UPDATE
                </button>
            </div>
        )
    }
}

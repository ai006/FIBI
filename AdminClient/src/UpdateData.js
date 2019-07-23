import React, { Component } from 'react';

import InputForm from './InputForm'
import './Styles.css'

export default class UpdateData extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            CompanyName: '',
            logo: '',
            address:{
                street:'',
                city:'',
                country:'',
            },
            link: '',
            jobs: '',
            about: '',
        };
        console.log("In constructor")
    }
   
    UpdateChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    UpdateAddress = (property,event) => {
        const address = {...this.state.address};
        address[property] = event.target.value;
        this.setState({address:address})
    }

    // our delete method that uses our backend api
    // to remove existing database information
    updateDataToDB = (data) => {
      this.props.update(data)
    };

    render(){
        return(
            <div>     
             <div> 
                 <h3 className='colorBlue'>Update data</h3> 
             <div>
                 <InputForm type={"text"} name="id" value={this.state.id} handleChange={this.UpdateChange} placeholder={"ID of job to update"}/>
                 <InputForm type={"text"} name="CompanyName" value={this.state.CompanyName} handleChange={this.UpdateChange} placeholder={"update Company name"}/>
                 <InputForm type={"text"} name="logo" value={this.state.logo} handleChange={this.UpdateChange} placeholder={"update logo"}/>
                 <InputForm type={"text"} name="street" value={this.state.address.street} handleChange={this.UpdateAddress.bind(this,'street')} placeholder={"update street"}/>
                 <InputForm type={"text"} name="city" value={this.state.address.city} handleChange={this.UpdateAddress.bind(this,'city')} placeholder={"update city"}/>
                 <InputForm type={"text"} name="country" value={this.state.address.country} handleChange={this.UpdateAddress.bind(this,'country')} placeholder={"update country"}/>
                 <InputForm type={"text"} name="link" value={this.state.link} handleChange={this.UpdateChange} placeholder={"update link"}/>
                 <InputForm type={"text"} name="jobs" value={this.state.jobs} handleChange={this.UpdateChange} placeholder={"update jobs"}/>
                 <textarea  style={{width:'200px',padding:'10px'}} rows = "4" name= "about" value={this.state.about} onChange={this.UpdateChange} placeholder={"update about company"}/>
             </div>
                <button onClick={() => this.updateDataToDB(this.state)}>UPDATE</button>
             </div>
         </div>
        )
    }
}

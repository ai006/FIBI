import React, { Component } from 'react';

import InputForm from './InputForm'
import './Styles.css'

export default class AddData extends Component {

    constructor(props){
        super(props);
        this.state = {
            CompanyName: '',
            logo:'',
            address:{
                street:'',
                city:'',
                country:'',
            },
            link:'',
            jobs:'',
            about:'',
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

    

    putDataToDB = (message) => {
      this.props.add(message)
    }

    render(){
        return(
            <div> 
                <h3 className='colorBlue'>Add data</h3> 
                <div>
                    <InputForm type={"text"} name="CompanyName" value={this.state.CompanyName} handleChange={this.UpdateChange} placeholder={"Company name"}/>
                    <InputForm type={"text"} name="logo" value={this.state.logo} handleChange={this.UpdateChange} placeholder={"logo"}/>
                    <InputForm type={"text"} name="street" value={this.state.address.street} handleChange={this.UpdateAddress.bind(this,'street')} placeholder={"street"}/>
                    <InputForm type={"text"} name="city" value={this.state.address.city} handleChange={this.UpdateAddress.bind(this,'city')} placeholder={"city"}/>
                    <InputForm type={"text"} name="country" value={this.state.address.country} handleChange={this.UpdateAddress.bind(this,'country')} placeholder={"country"}/>
                    <InputForm type={"text"} name="link" value={this.state.address.link} handleChange={this.UpdateChange} placeholder={"link"}/>
                    <InputForm type={"text"} name="jobs" value={this.state.address.jobs} handleChange={this.UpdateChange} placeholder={"jobs"}/>
                    <textarea  style={{width:'200px',padding:'10px'}} rows = "4" name= "about" value={this.state.about} onChange={this.UpdateChange} placeholder={"about company"}/>
                </div>
                <button onClick={() => this.putDataToDB(this.state)}>
                    ADD
                </button>
            </div>
        
        )
    }
}

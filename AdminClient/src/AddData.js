import React, { Component } from 'react';

import InputForm from './InputForm';
import './Styles.css';
import {changeToArray} from './strToArray';
 

//This is the class which is used to add data 
//the variables in the constructor hold data entered by the user
export default class AddData extends Component {

    constructor(props){
        super(props);
        this.state = {
            CompanyName: '',
            logo:'',
            educationLevel:'',
            address:{
                city:'',
                cityArr: [],
                country:'',
                countryArr: [],
            },
            link:'',
            jobs:'',
            jobsArr:[],
            about:'',
        };
        console.log("In constructor")
    }
   
    //function is automatically called to update property/object value when a user
    // updates text in the input for CompanyName, logo, link, jobs and about
    UpdateChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    //function is automatically called to update property/object value when a user
    // updates text in the input for city and country
    UpdateAddress = (property,event) => {
        const address = {...this.state.address};
        address[property] = event.target.value;
        this.setState({address:address})
    }

    //function to send the state or all the data to function "putDataToDB"
    //"putDataToDB" is found in the file APP.js
    putDataToDB = () => {
      changeToArray(this.state);                                                 
      this.props.add(this.state);
      this.setState(                //after sending data reset arrays 
          {
            jobsArr:[],  
            address:{...this.state.address,
                cityArr:[],
                countryArr:[],
          }
    })
    }

    render(){
        return(
            <div> 
                <h3 className='colorBlue'>Add data</h3> 
                <div>
                    <InputForm type={"text"} name="CompanyName" value={this.state.CompanyName} handleChange={this.UpdateChange} placeholder={"Company name"}/>
                    <InputForm type={"text"} name="logo" value={this.state.logo} handleChange={this.UpdateChange} placeholder={"logo"}/>
                    <InputForm type={"text"} name="educationLevel" value={this.state.educationLevel} handleChange={this.UpdateChange} placeholder={"education level"}/>
                    <InputForm type={"text"} name="city" value={this.state.address.city} handleChange={this.UpdateAddress.bind(this,'city')} placeholder={"city"}/>
                    <InputForm type={"text"} name="country" value={this.state.address.country} handleChange={this.UpdateAddress.bind(this,'country')} placeholder={"country"}/>
                    <InputForm type={"text"} name="link" value={this.state.address.link} handleChange={this.UpdateChange} placeholder={"link"}/>
                    <InputForm type={"text"} name="jobs" value={this.state.jobs} handleChange={this.UpdateChange} placeholder={"jobs"}/>
                    <textarea  style={{width:'200px',padding:'10px'}} rows = "4" name= "about" value={this.state.about} onChange={this.UpdateChange} placeholder={"about company"}/>
                </div>
                <button onClick={() => this.putDataToDB()}>
                    ADD
                </button>
            </div>
        
        )
    }
}

import React, { Component } from 'react';

import InputForm from './InputForm';
import './Styles.css';
import {changeToArray} from './strToArray';

export default class UpdateData extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            CompanyName: '',
            logo: '',
            educationLevel:'',
            address:{
                city:'',
                cityArr: [],
                country:'',
                countryArr: [],
            },
            link: '',
            jobs: '',
            jobsArr: [],
            about: '',
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

    //function to send the state or all the data to function "updateDB"
    //"updateDB" is found in the file APP.js
    updateDataToDB = () => {
        changeToArray(this.state);      //function to change the str of city, country, and jobs to array of string
        this.props.update(this.state)
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
                 <InputForm type={"text"} name="educationLevel" value={this.state.educationLevel} handleChange={this.UpdateChange} placeholder={"update education level"}/>
                 <InputForm type={"text"} name="city" value={this.state.address.city} handleChange={this.UpdateAddress.bind(this,'city')} placeholder={"update city"}/>
                 <InputForm type={"text"} name="country" value={this.state.address.country} handleChange={this.UpdateAddress.bind(this,'country')} placeholder={"update country"}/>
                 <InputForm type={"text"} name="link" value={this.state.link} handleChange={this.UpdateChange} placeholder={"update link"}/>
                 <InputForm type={"text"} name="jobs" value={this.state.jobs} handleChange={this.UpdateChange} placeholder={"update jobs"}/>
                 <textarea  style={{width:'200px',padding:'10px'}} rows = "4" name= "about" value={this.state.about} onChange={this.UpdateChange} placeholder={"update about company"}/>
             </div>
                <button onClick={() => this.updateDataToDB()}>UPDATE</button>
             </div>
         </div>
        )
    }
}

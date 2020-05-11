import React, { Component } from 'react';
import './Styles.css'

import {searchJob} from './api'
import ListJob from './ListJob'


//class used to delete a job from the database
export default class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            job: '',                       //jobs to fetch
            data: [],
        };
        console.log("In constructor")
    }
   
    //function for handling input from user
    handleIdChange = event => {
        this.setState({job: event.target.value})
    }

    // our delete method that uses our backend api
    // to remove existing database information
    searchFromDB = async (jobToSeach) => {
        console.log('called '+jobToSeach.toString());
        const temp  = await searchJob(jobToSeach);
        this.setState({data:temp})
    };

    //display an input box to enter the ID number
    render(){
        const { data } = this.state;
        console.log(data)
        return(
            <div>
              <div>
              <h3 className='colorBlue'>Search Jobs</h3> 
                <div>
                  <input type="text" className='myWidth' placeholder="Enter job to search" value={this.state.id} onChange={this.handleIdChange}/>
              </div>
                  <div className="MarginTop">
                    <button onClick={() => this.searchFromDB(this.state.job)}>
                      Search
                    </button> 
                  </div>
                  <div>
                  {
                    <ul>
                        {data.length <= 0 ? 'NO SEARCH ENTRIES YET' : data.map(job => <ListJob key={job.id} {...job}/>)}
                    </ul>
                   }
                  </div>
                </div>
            </div>
        )
    }
}
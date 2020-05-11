import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HeaderComponent from './headers';
import JobsComponent from './jobsHeader'
import imagesComponent from './images';
import jobsToVetComponent from './jobsToVet';
import searchComponent from './searchJob';


/*first executed page on admin client
the default page is from jobsComponent which shows
all the jobs in the database. it also has links to 
the images and jobs added by user to be vetted*/
class App extends Component {

  render(){
    return (
      <Router>
        <div>
          <HeaderComponent></HeaderComponent>

          <Route exact path='/' component={JobsComponent}></Route>
          <Route exact path='/userAddedJobs' component={jobsToVetComponent}></Route>
          <Route exact path='/images' component={imagesComponent}></Route>
          <Route exact path='/search' component={searchComponent}></Route>
        </div>
      </Router> 
    )
  }
}

export default App;
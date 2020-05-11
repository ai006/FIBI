
import React, { Component } from 'react';  
import { Link } from 'react-router-dom'


//class component that lets the user switch 
//between screens from Home which displays all the jobs in the database
//userAddedJobs which displays all the jobs added by the user to be vetted ( still underconstruction)
//images which displays all the images we have currently in our database
class  HeaderComponent extends Component {

    render(){
        return (
            <ul>
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <Link to="/userAddedJobs"> User added jobs </Link>
              </li>
              <li>
                <Link to="/images"> Images </Link>
              </li>
              <li>
                <Link to="/search"> search Job </Link>
              </li>
            </ul>
          )
    }
}

export default HeaderComponent;
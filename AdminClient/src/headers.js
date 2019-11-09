
import React, { Component } from 'react';  
import { Link } from 'react-router-dom'

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
            </ul>
          )
    }
}

export default HeaderComponent;
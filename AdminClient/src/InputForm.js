import React from 'react'
import './Styles.css'

//a reusable input format which is used by all the inputs
//all the inputs have the same style and width etc...
const Input = (props) => {
    return (  
  <div>
     <input
     style={{width:'200px',padding:'10px'}}
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
    />
  </div>
)
}

export default Input;
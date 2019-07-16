import React from 'react'
import './Styles.css'


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
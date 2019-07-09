import React from 'react'


const ListJob = props => (
    <li key={props.id} style={{ padding: '10px' }} >
        <span style={{ color: 'blue' }}> id: </span> {props.id} <br />
        <span style={{ color: 'blue' }}> data: </span>{props.message}
    </li>
)

export default ListJob

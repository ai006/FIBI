import React from 'react'


const ListJob = props => (
    <li key={props.id} style={{ padding: '10px' }} >
        <span style={{ color: 'blue' }}> id: </span> {props.id} <br />
        <span style={{ color: 'blue' }}> company: </span>{props.CompanyName} <br />
        <span style={{ color: 'blue' }}> logo: </span> {props.logo} <br />
        <span style={{ color: 'blue' }}> education level: </span>{props.educationLevel} <br />
        <span style={{ color: 'blue' }}> city: </span> {props.address.city} <br />
        <span style={{ color: 'blue' }}> country: </span>{props.address.country} <br />
        <span style={{ color: 'blue' }}> link: </span> {props.link} <br />
        <span style={{ color: 'blue' }}> jobs: </span>{props.jobs} <br />
        <span style={{ color: 'blue' }}> about: </span>{props.about} <br />
    </li>
)

export default ListJob

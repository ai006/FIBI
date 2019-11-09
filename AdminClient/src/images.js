import React, { Component } from 'react';
import "./Styles.css";

//array of logos for companies in the database
const Images = ['amazon','facebook','google', 'intel','walmart','xilinx'];


//Component class for displaying images of 
//companies in the database
class imageComponent extends Component{
    render(){

        //iterate through array of Images and post every image
        //with a margin of 20 up left right down
        let images = Images.map((image,index) => {
            return <img key={index} src={require(`./images/${image}.png`)} alt=""  style={{margin:20}}/>
         });

        return (
                <div >
                    { images }
                </div>
        );
    }
 
}

export default imageComponent ;



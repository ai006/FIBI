import React, { Component } from 'react';
import { StyleSheet,Text,TouchableOpacity,View,
        ImageBackground,Dimensions} from 'react-native';
import PropTypes from 'prop-types' ;
import { Card } from 'react-native-paper';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { defaultStyles } from '../styles';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

var randomImg = [
    require('../images/Cinnamint.jpg'), require('../images/EasyMed.jpg'),    
    require('../images/EndlessRiver.jpg'), require('../images/GreenandBlue.jpg'), 
    require('../images/Limeade.jpg'),     
    require('../images/Mild.jpg'), require('../images/Mojito.jpg'),    
    require('../images/NeonLife.jpg'), require('../images/Ohhappiness.jpg'),
    require('../images/Quepal.jpg'), require('../images/SummerDog.jpg'),
    require('../images/TealLove.jpg')];

let timer = null; //variable to use for closing the timer

/*uniqueOptionsCard is used to show the special
 options on the main screen ranging from University
 Graduate school, GRE, SAT,stories, to gerneral questions */
export default class uniqueOptionsCard extends Component {

  constructor(props){
    super(props);
    this.state = {
        lockClick : false, //boolean used to handle debouncing when a click occurs
  }
}

  //function used to open forum
  openForurm = () => {

    if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
      this.setState({                 
        lockClick : true              //lock the clickable object
    })
    
    //handleClick is the function that was passed when
    //this class or component was called
    this.props.handleClick(this.props.option)  

    timer = setTimeout(() => {              //for handling debouncing
      this.setState({                       //set lockClick to true after 1 sec
        lockClick : false
      })
    }, 1000);
  }

  render() {
    const {option,emoji} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.3} 
          onPress={this.openForurm}>
          <ImageBackground
            source={ randomImg[Math.floor(Math.random()*randomImg.length)]}
            style={[styles.shadow,styles.imageContainer]}
            imageStyle={{ borderRadius: 10}}
          >
            <Text style={{fontSize: wp('5%')}}>{emoji} </Text>
            <Text style={{color:'white',fontSize: wp('5%'),fontWeight:'bold'}}>{option}</Text>
          </ImageBackground>
      </TouchableOpacity>
      
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  imageContainer: {
    //flex: 1,  
    borderRadius: 10,                        // take up all available space
    height: height*0.11,
    width: width * 0.4,
    alignItems:'center',
    justifyContent:'center'
},
});
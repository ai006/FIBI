import React from "react";
import {ImageBackground,Dimensions,ScrollView, Button, View, StyleSheet, Text,Image,TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import ForumCard from '../../cards/forumCard'
import {Questions} from './models'

// Get screen dimensions
const { width, height } = Dimensions.get('window');

var randomImg = [      
  require('../../images/Mojito.jpg'),require('../../images/NeonLife.jpg'),
  require('../../images/Ohhappiness.jpg'),require('../../images/Quepal.jpg'),    
  require('../../images/SummerDog.jpg'),require('../../images/TealLove.jpg'),    
  ]; 

class ForumScreen extends React.Component {
    
  //hide the  header 
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
              color: 'green',
              fontSize: 25,
            },
     };
  };
  
  openDetailedQuery = (question) => {
    
    this.props.navigation.push('detailedForum', {   // Navigate away to detailed forum route
      query: question
    });
  }

  openAnswerQuery = () => {
    this.props.navigation.push('newAnswer');
  }
  
  render() {
    //const {questions}  = this.props;
    const questions = this.props.navigation.getParam('questions');
    
    
    return (
      <View style={{ backgroundColor:'#DCDCDC', flex:1, 
                     alignItems:'center', justifyContent: 'center',paddingTop:2}}>
        <ScrollView>
          { 
            questions.map((question,index) =>  
              <TouchableOpacity key={index} onPress={() => this.openDetailedQuery(question)}>
                <View key={index} style={{marginTop: 1.5}}>
                  <ForumCard openAnswer={this.openAnswerQuery}  question={question} key={index}/>
                </View>
              </TouchableOpacity>
              )
          }
        </ScrollView>
          <TouchableOpacity style={styles.btn} 
            onPress={() => 
              this.props.navigation.push('newQuestion', //name of the category selected to send to the new question screen
                              { category : this.props.navigation.getParam('option')})}>
            <ImageBackground style={styles.img} 
                source={randomImg[Math.floor(Math.random()*randomImg.length)]}
                imageStyle={{ borderRadius: 35}}>
              <Icon name='create' type='material' color='white' size={45}/>
            </ImageBackground>
          </TouchableOpacity>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.forum.forum, //array of the type of jobs
    status: state.forum.error,    //string of error message if an error occurs during fetch
    pending: state.forum.pending, //boolean true during fetching of API data and false before and after fetching  
  };
}; 

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  },
  btn:{
    position:'absolute',
    width:65,
    height:65,
    bottom:15,
    right:15,
    alignItems:'center',
    justifyContent:'center'
  },
  img:{
    position:'absolute',
    width:65,
    height:65,
    bottom:15,
    right:15,
    alignItems:'center',
    justifyContent:'center'
  }
});


export default connect(mapStateToProps,null)(ForumScreen);
import React from "react";
import {ImageBackground,Dimensions,ScrollView, Button, View,ActivityIndicator,
         StyleSheet, Text,Image,TouchableOpacity,KeyboardAvoidingView } from "react-native";
import { Icon } from 'react-native-elements';
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import ForumCard from '../../cards/forumCard'
//import store from '../../redux/store'
//import {fetchForumData} from '../../api/forumApi'

// Get screen dimensions
const { width, height } = Dimensions.get('window');

var randomImg = [      
  require('../../images/Mojito.jpg'),require('../../images/NeonLife.jpg'),
  require('../../images/Ohhappiness.jpg'),require('../../images/Quepal.jpg'),    
  require('../../images/SummerDog.jpg'),require('../../images/TealLove.jpg'),    
  ]; 

let timer = null; //variable to use for closing the timer

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

  constructor(props){
    super(props);
    this.state = {
        lockClick : false, //boolean used to handle debouncing when a click occurs
    }
  }

  
  openDetailedQuery = (question, idNumber) => {

    if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
            this.setState({                 
                lockClick : true              //lock the clickable object
    })
    this.props.navigation.push('detailedForum', {   // Navigate away to detailed forum route
                                                    query: question,
                                                    id : idNumber
                                                  });
    timer = setTimeout(() => {              //for handling debouncing
      this.setState({                       //set lockClick to true after 1 sec
        lockClick : false
      })
    }, 1000);
                                                
  }

  /* function used to open the newAnswerScreen 
  which is used to add comments to questions.
  The argument data is the ID of the selected question in the redux*/ 
  openAnswerQuery = (data,inquiry) => {

    if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
            this.setState({                 
                lockClick : true              //lock the clickable object
    })
    this.props.navigation.push('newAnswer', {
                                              id : data,
                                              question : inquiry,
                                              route : 'first_route'
                                            }
    );
    timer = setTimeout(() => {              //for handling debouncing
      this.setState({                       //set lockClick to true after 1 sec
        lockClick : false
      })
    }, 1000);
  }

  openNewQuestion = () => {
    if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
            this.setState({                 
                lockClick : true              //lock the clickable object
    })
    this.props.navigation.push('newQuestion', //name of the category selected to send to the new question screen
                                  { category : this.props.navigation.getParam('option')}
                                )
    timer = setTimeout(() => {              //for handling debouncing
      this.setState({                       //set lockClick to true after 1 sec
        lockClick : false
      })
    }, 1000);
  }

  
  render() {
    const {questions, status, pending}  = this.props;

    if(pending){
      return (
        <View style={[styles.container, styles.horizontal, styles.loadingOnStart]}>
          <ActivityIndicator size="large" color="#2ae815" />
        </View>
      )
    }
    const category = this.props.navigation.getParam('option');
    var msg = 'They are currently no questions to show for this category but you can be the first😁😁😁'
    
    var results = [];
    //var sortedResults = []; 

    for (var i = 0; i < questions.length; i++) { 
      if (questions[i].category === category) {
            results.push(questions[i]);
        }
    }

    //sort the results newest posts first
    results.sort(function(a,b)  {   
      var dateA = new Date(a.createdAt).getTime();
      var dateB = new Date(b.createdAt).getTime();
      return dateA > dateB ? -1 : 1;  
    });

    if(results.length === 0){
      return(
        <View style={{ backgroundColor:'#DCDCDC', flex:1, 
                     alignItems:'center', justifyContent: 'center',paddingTop:2}}>
          <View style={{backgroundColor:'white',padding:20, borderRadius:20,marginHorizontal:10}}>
            <Text style={{fontSize:19}}>{msg}</Text>
          </View>
          <TouchableOpacity style={styles.btn} 
            onPress={this.openNewQuestion}>
            <ImageBackground style={styles.img} 
                source={randomImg[Math.floor(Math.random()*randomImg.length)]}
                imageStyle={{ borderRadius: 35}}>
              <Icon name='create' type='material' color='white' size={45}/>
            </ImageBackground>
          </TouchableOpacity>    
        </View>
    )}
    
    return (
      <View style={{ backgroundColor:'#DCDCDC', flex:1, 
                     alignItems:'center', justifyContent: 'center',paddingTop:2}}>
        <ScrollView>
          { 
            results.map((question,index) =>  
              <TouchableOpacity key={index} onPress={() => this.openDetailedQuery(question,index)}>
                <View key={index}>
                  <ForumCard openAnswer={this.openAnswerQuery}  question={question} key={index} id={index}/>
                </View>
              </TouchableOpacity>
              )
          }
        </ScrollView>
          <TouchableOpacity style={styles.btn} 
            onPress={this.openNewQuestion}>
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
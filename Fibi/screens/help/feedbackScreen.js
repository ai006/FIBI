import React from "react";
import { Button, View, StyleSheet, Text,Image,ScrollView,Dimensions,TouchableOpacity, AsyncStorage } from "react-native";
import { Icon } from 'react-native-elements'
import { Platform } from "react-native";
import { Card } from 'react-native-paper';

import * as Analytics from 'expo-firebase-analytics';
import Ionicons from "react-native-vector-icons/Ionicons";
import DescriptionModal from '../../modals/descriptionModal';

const {height, width} = Dimensions.get('window')
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
let timer = null; //variable to use for closing the timer

export default class FeedbackScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:  () =>
      <View style={{flex:1, flexDirection:'row'}}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image
              source={require('../../images/logo_small.jpg')}
              style={{width:40, height:40, flex:1}}
              resizeMode="contain"
          />
      </View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{
            alignSelf:'center',
            color: 'green',
            fontSize: 20,
            fontFamily:Platform.OS === 'ios'? 'Avenir': 'serif',}}>
              FIBI
          </Text>
      </View>
    </View>,
      headerTitle: () => null,
    };
  };

  constructor(props){
    super(props);
    this.state = {
        showdescriptionModal:false,
        title:'Feedback',
        description:
                    'On this page you can sign up for our contact list to be notified if a question concerning your major has been asked so that you can help us answer it.\n\n'+
                    'You can also interact with us on this page by informing us of any bugs or errors in the app so that we can fix them.\n\n' +
                    'You can also help us by letting us know how we can improve this app.\n\n',
        lockClick : false, //boolean used to handle debouncing when a click occurs
    }
  }

  handleClickFeedback = () => {
    if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
    this.setState({                 
            lockClick : true              //lock the clickable object
    })

    this.props.navigation.push('input', {
                                        title:'feedback',
                                        placeHolder: 'What can we improve on or add?'})

    timer = setTimeout(() => {              //for handling debouncing
      this.setState({                       //set lockClick to true after 1 sec
        lockClick : false
      })
    }, 1000);
  }

  handleClickReport = () => {
    if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
    this.setState({                 
            lockClick : true              //lock the clickable object
    })
    
    this.props.navigation.push('input', {
                                        title:'Report 🐞',
                                        placeHolder: 'How did the app crash or whats not working?'})
    
    timer = setTimeout(() => {              //for handling debouncing
      this.setState({                       //set lockClick to true after 1 sec
        lockClick : false
      })
    }, 1000);
  }
  
  handleClickAmbassador = () => {

    if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
    this.setState({                 
            lockClick : true              //lock the clickable object
    })

    this.props.navigation.push('input', {
                                          title:'connect',
                                          placeHolder: 'your linkedin name or email address'})

    timer = setTimeout(() => {              //for handling debouncing
      this.setState({                       //set lockClick to true after 1 sec
        lockClick : false
      })
    }, 1000);
  }


  descriptionModalClosed = () => {
    this.setState({
      showdescriptionModal:false
  });
  AsyncStorage.setItem('feedbackscreen', JSON.stringify(false));
}

  descriptionModalreopen = () => {
    this.setState({
      showdescriptionModal:false
    });
  }
  
  componentDidMount() {
    //Analytics.setCurrentScreen("help_screen")
    //console.log("hereinfeedback")
    AsyncStorage.getItem('feedbackscreen').then((value) => {
      let thevalue = JSON.parse(value);
      if (thevalue != null){
        this.setState({ showdescriptionModal: thevalue});
      }
      else{
        this.setState({ showdescriptionModal: true});
      }
    });
    
  }
  render() {
    const {title, description} = this.state;
   
    return (
      <View style={styles.container}>
        <DescriptionModal clicker={this.state.showdescriptionModal} title={title} description ={description} onclick ={this.descriptionModalClosed} reopen={this.descriptionModalreopen}/>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{flex:1}}>

          <View style={styles.FirstContainer}>
              <Card style={[styles.about,styles.shadow]}>
                  <View style={styles.containerCard}>
                      <Text style={styles.paragraph}>
                      This app has the potential to help a lot of international students, especially the forum feature. 
                      So we are actively looking for people in or with different majors 
                      who will be willing to answer some of these questions. The more questions we can explain the more students we can help.  
                      </Text>
                  </View>
                  <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row',marginTop: 3}}>
                      <TouchableOpacity style={styles.write} onPress={this.handleClickAmbassador}>
                          <Icon name='create' type='material' color='#00AF33' size={wp('3.67%')}/>
                          <Text style={{fontWeight:'bold',color:'gray', fontSize: wp('3.67%')}}>Join us</Text>
                      </TouchableOpacity>
                  </View>
              </Card>
          </View>

          <View style={styles.FirstContainer}>
              <Card style={[styles.about,styles.shadow]}>
                  <View style={styles.containerCard}>
                      <Text style={styles.paragraph}>
                          Is your degree not represented in our database? Is there any feature you would
                          like to see added in the future? what would you like us to improve? Please let us know
                      </Text>
                  </View>
                  <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row',marginTop: 3}}>
                      <TouchableOpacity style={styles.write} onPress={this.handleClickFeedback}>
                          <Icon name='create' type='material' color='#00AF33' size={wp('3.67%')}/>
                          <Text style={{fontWeight:'bold',color:'gray', fontSize: wp('3.67%')}}>Feedback</Text>
                      </TouchableOpacity>
                  </View>
              </Card>
          </View>

          <View style={styles.FirstContainer}>
              <Card style={[styles.about,styles.shadow]}>
                  <View style={styles.containerCard}>
                      <Text style={styles.paragraph}>
                          Did the app crash? Is a certain feature slow? Are you having any issues with
                          any feature? Please let us know so that we can work on it. We are a small team 
                          of two and we are doing the best that we can.
                      </Text>
                  </View>
                  <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row', marginTop: 3}}>
                      <TouchableOpacity style={styles.write} onPress={this.handleClickReport}>
                          <Icon name='create' type='material' color='#00AF33' size={wp('3.67%')}/>
                          <Text style={{fontWeight:'bold',color:'gray', fontSize: wp('3.67%')}}>Report</Text>
                      </TouchableOpacity>
                  </View>
              </Card>
          </View>
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fcfcfc'
  },
  write: {
    flexDirection:'row',
    marginLeft: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  containerCard:{
    marginTop: 5,
    flex:4,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  },
  FirstContainer: {
    justifyContent: 'center',
    padding: 8,
  },
  about: {
    height : height*0.19,
  },
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
  paragraph: {
    margin: 10,
    fontSize: wp('3.12%'),
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

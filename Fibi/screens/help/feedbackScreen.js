import React from "react";
import { Button, View, StyleSheet, Text,Image,ScrollView,Dimensions,TouchableOpacity, AsyncStorage } from "react-native";
import { Icon } from 'react-native-elements'
import { Platform } from "react-native";
import { Card } from 'react-native-paper';

import Ionicons from "react-native-vector-icons/Ionicons";
import DescriptionModal from '../../modals/descriptionModal';

const {height, width} = Dimensions.get('window')

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

  handleClickFeedback = () => {
    this.props.navigation.push('input', {
                                        title:'feedback',
                                        placeHolder: 'What can we improve on or add?'})}
  handleClickReport = () => {
    this.props.navigation.push('input', {
                                        title:'Report 🐞',
                                        placeHolder: 'How did the app crash or whats not working?'})}
  handleClickAmbassador = () => {
    this.props.navigation.push('input', {
                                          title:'connect',
                                          placeHolder: 'your linkedin name or email address'})}
  constructor(props){
    super(props);
    this.state = {
        showdescriptionModal:false,
        title:'Any Feed back',
        description:'Please tell as how we may improve the app. Report any bugs and also connect with us if you would like to take part in the improvements of FIBI'
    }
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
                          This app has the potential to help a lot of international students especially its forum feature.
                          So we are looking for people in different that will be willing to answer some of this questions   
                      </Text>
                  </View>
                  <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row'}}>
                      <TouchableOpacity style={styles.write} onPress={this.handleClickAmbassador}>
                          <Icon name='create' type='material' color='#00AF33' size={20}/>
                          <Text style={{fontWeight:'bold',color:'gray'}}>Join us</Text>
                      </TouchableOpacity>
                  </View>
              </Card>
          </View>

          <View style={styles.FirstContainer}>
              <Card style={[styles.about,styles.shadow]}>
                  <View style={styles.containerCard}>
                      <Text style={styles.paragraph}>
                          Is your degree not represented in our database? Is there any feature you would
                          like to see added in the future, or what would you like us to improve?
                      </Text>
                  </View>
                  <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row'}}>
                      <TouchableOpacity style={styles.write} onPress={this.handleClickFeedback}>
                          <Icon name='create' type='material' color='#00AF33' size={20}/>
                          <Text style={{fontWeight:'bold',color:'gray'}}>Feedback</Text>
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
                  <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row'}}>
                      <TouchableOpacity style={styles.write} onPress={this.handleClickReport}>
                          <Icon name='create' type='material' color='#00AF33' size={20}/>
                          <Text style={{fontWeight:'bold',color:'gray'}}>Report</Text>
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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

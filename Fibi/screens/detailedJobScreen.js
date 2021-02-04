import React, { Component} from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, 
        ScrollView, View, Dimensions,Linking} from 'react-native';
import { Card } from 'react-native-paper';

import * as Analytics from 'expo-firebase-analytics';
import { defaultStyles } from '../styles';
import ScrollViews from '../scrollViews';
import Options from '../Options';
import WebModal from './jobs/webModal';


const {height, width} = Dimensions.get('window')


/* This class shows the page of the job with more detailes
 that was clicked. */
export default class DetailedJobScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('job').abbreviation,
      headerTitleStyle: {
        color: 'green',
        fontSize: 25,
      },
    };
  };

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      url : {}
      
    }
  }


  showSite = (link) => {
    this.setState({
      showModal: true,
      url : link
    })
  }

  closeSite = () => {
    this.setState({
      showModal: false,
      url : {}
    })
  }
  // componentDidMount() {
  //   Analytics.setCurrentScreen("main_screen")
  //   //console.log(this.props.navigation.getParam('job').CompanyName)
  // }

  render() {
    
    const job = this.props.navigation.getParam('job');
    let link = job.link.toString()
    let about = job.about.toString()
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card style={[styles.shadow,styles.card,styles.cardBackgroundColor]}>
            <View style={[styles.horizontalArrangement,styles.placeCenter]}>
                <Image style={styles.imageStyle} source={{uri: job.logo}}/>
            </View>
          </Card>
          <Card style={[styles.shadow,styles.hireCard,styles.cardBackgroundColor]}>
            <ScrollViews name={job.hireArr} group={<Text>Company hires</Text>}/>
          </Card>
          <Card style={[styles.shadow,styles.linkContainer, styles.cardBackgroundColor]}>
                <View style={[styles.linkStyle,styles.horizontalArrangement]}>
                  <Text style={{flex:1,color:'#a5acad', fontWeight: '200',fontSize:20}}> Sponsorship Education level : </Text>
                  <Text style={{flex:1,color:'green',fontSize:20}}>{job.educationLevel}</Text>
                </View>
          </Card>
          <Card style={[styles.shadow,styles.linkContainer,styles.cardBackgroundColor]}>
            <TouchableOpacity style={styles.linkStyle} onPress={()=>this.showSite(link)}>
                <View >
                  <Text  style={{color:'blue',textDecorationLine: 'underline',fontSize:20}}>{job.link}</Text>
                </View>
            </TouchableOpacity>
          </Card>
          <Card style={[styles.shadow,styles.containerCard,styles.cardBackgroundColor]}>
            <ScrollViews name={job.jobsArr} group={<Text>Hire</Text>}/>
            <ScrollViews name={job.address.cityArr} group={<Text>City</Text>}/> 
            <ScrollViews name={job.address.countryArr} group={<Text>Country</Text>}/>
          </Card>
          <Card style={[styles.shadow,{margin:10},styles.cardBackgroundColor]}>
            <Text style={{margin:10,color:'#a5acad',fontWeight: '500'}}>About</Text>
            {/* <Text style={{fontSize: 16,fontWeight: '500',margin:10}}>{job.about}</Text> */}
            <TouchableOpacity style={styles.linkStyle} onPress={()=>this.showSite(about)}>
                <View >
                  <Text  style={{color:'blue',textDecorationLine: 'underline',margin:20,fontSize:20}}>{job.about}</Text>
                </View>
            </TouchableOpacity>
          </Card>
          <Card style={[styles.shadow,styles.cardBackgroundColor]}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.pop()}>
              <Text style={styles.button}>Done</Text>
            </TouchableOpacity>
          </Card>
        </ScrollView> 
        <WebModal show={this.state.showModal} 
                  site={this.state.url} handleClick={this.closeSite}/>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fcfcfc',//'white',//'#ecf0f1',
  },
  containerCard: {
    height: height*0.45,
    margin: 10,
  },
  hireCard: {
    height: height*0.16,
    margin: 10,
  },
  cardBackgroundColor: {
    backgroundColor: '#fdfdfd',//'white',//'#fcfcfc'
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
  card: {
    margin: 10,
    height: height*0.25,
  },
  linkContainer:{
    margin: 10,
    height: height * 0.09,
    padding: 5,
  },
  linkStyle:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  horizontalArrangement: {
    flexDirection : 'row',
    alignSelf:'flex-start'
  },
  imageStyle: {     //css style for image shown in the detailedJob page
    height:125,
    width:125,
    resizeMode: 'contain',
    borderRadius:25,
    marginTop:10,
    flex: 1,
  },
  textStyle: {
    fontSize: 40,
    flex: 1, 
  },
  textColor:{
    color:'#a5acad'
  },
  placeCenter:{
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header: {
    ...defaultStyles.text,
    color: '#333',
    fontSize: 20,
  },
  code: {
    ...defaultStyles.text,
    color: '#333',
    fontSize: 36,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 100,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 18,
  },
  image: {
    borderRadius: 10,                 // rounded corners
    ...StyleSheet.absoluteFillObject, // fill up all space in a container
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4,
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14,
  },
 
});
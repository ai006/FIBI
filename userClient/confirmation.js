import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, Image, TouchableOpacity, ScrollView, View, Dimensions,Linking} from 'react-native';
import Constants from 'expo-constants';
import { Container } from 'native-base';

import { defaultStyles } from './styles';
import HorizontalScroll from './horizontalScroll';
import ScrollViews from './scrollViews';


const {height, width} = Dimensions.get('window')

export default class Confirmation extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('job').CompanyName,
    };
  };

  render() {
    
    const job = this.props.navigation.getParam('job');
    let link = job.link.toString()
    link = 'https://'.concat(link);
    //console.log(link)
    return (
      <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={Container}>
          <View style={{width:width, height: 130, marginTop:20,alignItems: 'center', }}>
            <Image
                style={{height:100,width:100,resizeMode: 'stretch', borderRadius:25,borderWidth:1,
                        borderColor:'#dddddd'}}
                source={{uri: job.logo}}/>
              <Text style={{fontWeight: '500',color:'#e0e04f',}}>{job.CompanyName}</Text>
          </View>

          <TouchableOpacity>
            <View style={{alignItems:'center'}}>
              <Text onPress={ ()=> Linking.openURL(link) } style={{color:'blue',textDecorationLine: 'underline',}}>{job.link}</Text>
            </View>
          </TouchableOpacity>

            <ScrollViews name={job.jobsArr} group={<Text>Hiring</Text>}/>
            <ScrollViews name={job.address.countryArr} group={<Text>Country</Text>}/>
            <ScrollViews name={job.address.cityArr} group={<Text>City</Text>}/>

          <View style={{marginLeft:20, marginTop:20, marginRight:20,}}>
            <Text style={{fontWeight: '500',color:'#e0e04f'}}>About</Text>
            <Text style={{backgroundColor:'#a0e04f',fontSize: 16,fontWeight: '200',marginTop:5}}>{job.about}</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.pop()}>
            <Text style={styles.button}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  aboutColor:{
    backgroundColor: 'grey',
  },
  statusBar: {
    paddingTop: Constants.statusBarHeight,
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
    backgroundColor: '#673AB7',
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
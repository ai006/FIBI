import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, Image, TouchableOpacity, ScrollView, View, Dimensions,Linking} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { Container } from 'native-base';

import { defaultStyles } from './styles';
import HorizontalScroll from './horizontalScroll';
import ScrollViews from './scrollViews';


const {height, width} = Dimensions.get('window')

export default class Confirmation extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('job').CompanyName,
      headerTitleStyle: {
        color: 'green',
        fontSize: 25,
      },
    };
  };

  render() {
    
    const job = this.props.navigation.getParam('job');
    let link = job.link.toString()
    link = 'https://'.concat(link);
    //console.log(link)
    return (
      <View style={styles.container}>
        
          <Card style={styles.card}>
            <View style={[styles.horizontalArrangement,styles.placeCenter]}>
                <Image style={styles.imageStyle} source={{uri: job.logo}}/>
                <View style={{flex : 1, justifyContent: 'center', alignItems: 'center',}}>
                  <Text style={styles.textStyle}>{job.CompanyName}</Text>
                  <TouchableOpacity>
                    <View style={{alignItems:'center'}}>
                      <Text onPress={ ()=> Linking.openURL(link) } style={{color:'blue',textDecorationLine: 'underline',fontSize:20}}>{job.link}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
          </Card>
          <Card style={[styles.containerCard,styles.card]}>
            <ScrollViews name={job.jobsArr} group={<Text>Hiring</Text>}/>
          </Card>

          
         {/*   <ScrollViews name={job.address.countryArr} group={<Text>Country</Text>}/>
            <ScrollViews name={job.address.cityArr} group={<Text>City</Text>}/>

          <View style={{marginLeft:20, marginTop:20, marginRight:20,}}>
            <Text style={{fontWeight: '500',color:'#e0e04f'}}>About</Text>
            <Text style={{backgroundColor:'#a0e04f',fontSize: 16,fontWeight: '200',marginTop:5}}>{job.about}</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.pop()}>
            <Text style={styles.button}>Done</Text>
          </TouchableOpacity> */}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  containerCard: {
    flex: 1,
  },
  card: {
    margin: 10,
    height: 150,
  },
  horizontalArrangement: {
    flexDirection : 'row',
  },
  imageStyle: {
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
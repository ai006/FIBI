import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, Image, TouchableOpacity, ScrollView, View} from 'react-native';
import Constants from 'expo-constants';

import { defaultStyles } from './styles';
import {countries, hiring} from './model';

export default class Confirmation extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('job').CompanyName,
    };
  };

  render() {
    
    const job = this.props.navigation.getParam('job');

    return (
      <View style={styles.statusBar}>
      {/* // <View >style={styles.container}> */}
      <TouchableOpacity
          style={styles.buttonContainer}
          // Go back when pressed
          onPress={() => this.props.navigation.pop() }
        >
          <Text style={styles.button}>Done</Text>
        </TouchableOpacity>
        
        <ScrollView >
          <View>
          { hiring.map((hire,index) => <Text  key={index}>  {hire}</Text> ) }
          </View> 
        </ScrollView>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: job.logo}}
        />
        <Text style={styles.code}>{job.CompanyName}</Text>
        <Text style={styles.code}>{job.link}</Text>
        <Text style={styles.code}>{job.jobs}</Text>
        <Text style={styles.code}>{job.about}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
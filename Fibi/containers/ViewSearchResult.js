import React, { Component } from 'react';
import {ScrollView, Dimensions, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import JobPoster from './jobPoster';
import Constants from 'expo-constants';
//import JobPopUp from '../JobPopUp';
import JobPopUp from './JobPopUp';


export default class ViewSearchResults extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
         headerTitle: 'Results :  ' + navigation.getParam('userSearched'),
         headerTitleStyle: {
          color: 'green',
          fontSize: 25,
        },
    };
  };

  constructor(props){
    super(props);
    this.state = {
      popupIsOpen: false,
      Query: '',
      searching:false,
    }
  }

  openJob = (jobClicked) => {
    this.setState({
      popupIsOpen: true,
      jobClicked, 
    });
  }

  closeJob = () => {
    this.setState({
      popupIsOpen: false,
    }); 
  }

  seeDetailedJob = () => {
      this.closeJob();
      this.props.navigation.push('detailedJob', {   // Navigate away to detailedJob route
        job: this.state.jobClicked
      });
  }

  render(){
   
    //const {data} = this.props;
    const data = this.props.navigation.getParam('arrayResult');
    return (
      <View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent} >
              { data.map((job,index) => <JobPoster job={job} onOpen={this.openJob}  key={index}/>)}  
          </ScrollView>
          <JobPopUp jobClicked={this.state.jobClicked} isOpen={this.state.popupIsOpen}
            onClose={this.closeJob} onBook={this.seeDetailedJob}/>
        </View> 
       
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
  loading: {
    //position: 'absolute',
    marginTop: 10,
    left: 0,
    right: 0,
    // top: 0,
    // bottom: 0,
    //opacity: 0.2,
    //backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})
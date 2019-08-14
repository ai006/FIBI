import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, Dimensions, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import MoviePoster from './MoviePoster';
import Constants from 'expo-constants';
import MoviePopup from '../MoviePopUp';


class JobsData extends Component {
  constructor(props){
    super(props);
    this.state = {
      popupIsOpen: false,
    }
  }

  openMovie = (jobClicked) => {
    this.setState({
      popupIsOpen: true,
      jobClicked,	
    });
  }

  closeMovie = () => {
    this.setState({
      popupIsOpen: false,
    }); 
  }

  bookTicket = () => {
    // Make sure they selected time 
    // if (!this.state.chosenTime) {
    //   alert('Please select show time');
    // } else {
      // Close popup
      
      this.closeMovie();
      // Navigate away to Confirmation route

      this.props.navigation.push('Confirm', {
        // Generate random string
        code: Math.random().toString(36).substring(6).toUpperCase(),
      });
    //}
  }


  render(){

    const {data,status,pending} = this.props;
    //console.log(data)
    // if(!data) {
    //   return (
    //    <Text>No Data</Text>
       
    //   )
    // }
    if(pending){
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
    }
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} >
            { data.map((job,index) => <MoviePoster job={job} onOpen={this.openMovie}  key={index}/>)}  
        </ScrollView>
         <MoviePopup jobClicked={this.state.jobClicked} isOpen={this.state.popupIsOpen} onClose={this.closeMovie} onBook={this.bookTicket}/>
      </View> 
    );
  }
}

const mapStateToProps = state => {
  return {
    data:  state.data.jobs,      //array of jobs
    status: state.data.error,    //string of error message if an error occurs during fetch
    pending: state.data.pending, //boolean true during fetching of API data and false before and after fetching  
  };
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
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
})


export default connect(mapStateToProps,null)(JobsData);
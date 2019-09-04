import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, Dimensions, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';


import MoviePoster from './MoviePoster';
import Constants from 'expo-constants';
//import MoviePopup from '../MoviePopUp';
import MoviePopUp from './MoviePopup';

class JobsData extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Jobs',
      headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          color: 'green'
      },
     };
  };

  constructor(props){
    super(props);
    this.state = {
      popupIsOpen: false,
      Query: '',
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
      this.closeMovie();
      this.props.navigation.push('Confirm', {   // Navigate away to Confirmation route
        job: this.state.jobClicked
      });
  }

  render(){
    const { Query } = this.state;
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
      <View>
      <Searchbar
          placeholder="Search   'Paris'  or  'USA'  or  'IT'"
          onChangeText={query => { this.setState({ Query: query }); }}
          value={Query}
          style={{marginTop:0.5}}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} >
            { data.map((job,index) => <MoviePoster job={job} onOpen={this.openMovie}  key={index}/>)}  
        </ScrollView>
        <MoviePopUp jobClicked={this.state.jobClicked} isOpen={this.state.popupIsOpen}
          onClose={this.closeMovie} onBook={this.bookTicket}/>
      </View> 
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
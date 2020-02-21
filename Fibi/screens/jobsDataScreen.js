import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, Dimensions,TouchableOpacity, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import { Card } from 'react-native-paper';
//import { Icon } from 'react-native-elements';


import MoviePoster from '../containers/MoviePoster'
import Constants from 'expo-constants';
import JobPopUp from '../containers/JobPopUp';
import {searchRedux} from '../search';

class JobsData extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Jobs',
      headerRight: () =>
       <TouchableOpacity onPress={()=> navigation.navigate('AddJob')}>
         <Ionicons
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={40}
            color={'green'}
            style={{marginRight:20}}
          />
        </TouchableOpacity> 
      ,
      headerTitleStyle: {
          textAlign: "center",
          justifyContent: 'center',
          alignItems: 'center',
          flex:1,
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
      this.props.navigation.push('detailedJob', {   // Navigate away to detailed job route
        job: this.state.jobClicked
      });
  }

  searchData = (data) => {
    this.setState({
      searching:true,
    })
    searchResult = searchRedux(data,this.state.Query);
    this.setState({
      searching:false,
    })
    this.props.navigation.push('ViewResult', {
        arrayResult: searchResult,
        userSearched: this.state.Query
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
          <View style={[styles.container, styles.horizontal, styles.loadingOnStart]}>
            <ActivityIndicator size="large" color="#2ae815" />
          </View>
        )
    }
    return (
      <View style={{backgroundColor:'#ffffff', flex:1}}> 
          <Searchbar //android and ios have display differently
              placeholder = {Platform.OS === "ios" ? "Search  'Texas' or  'IT'" :
                "Search  'Texas'  or  'USA'  or  'IT'"}
              onChangeText={query => { this.setState({ Query: query }); }}
              value={Query}
              style={{marginTop:2,backgroundColor:'#ecf0f1'}}
              onIconPress={ () => this.searchData(data)}
          />
        {this.state.searching ?
          <View style={styles.loading}>
            <ActivityIndicator size='large' color='green' />
          </View>:null
        }
        <View style={[styles.ScreenBackground,styles.container]}>
          <ScrollView style={{marginBottom: 100,}} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} >
              { data.map((job,index) => <MoviePoster job={job} onOpen={this.openMovie}  key={index}/>)}
          </ScrollView>
          <JobPopUp jobClicked={this.state.jobClicked} isOpen={this.state.popupIsOpen}
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
    paddingTop: 0,                   //space between the search bar and images of jobs
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
  BottomPad: {
    paddingBottom: 20,
  },
  loading: {
    marginTop: 10,
    left: 0,
    right: 0,
  },
  loadingOnStart:{
    marginTop: 10,
  },
  ScreenBackground: {
    backgroundColor: '#ffffff',
  }
})

export default connect(mapStateToProps,null)(JobsData);
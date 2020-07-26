import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, Dimensions,TouchableOpacity, 
        StyleSheet, Text, View, ActivityIndicator,
        FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import { Card } from 'react-native-paper';
//import { Icon } from 'react-native-elements';

import JobPoster from '../containers/jobPoster'
import Constants from 'expo-constants';
import JobPopUp from '../containers/JobPopUp';
//import {searchRedux} from '../search';



// How many posters we want to have in each row and column
const numColumns = 3;

//used for getting ket for FlatList
const extractKey = ({ id }) => id.toString()

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push(  { _id: numberOfElementsLastRow,
                  address: {
                    cityArr:[],
                    countryArr:[],
                    city:'',
                    country:''
                  },
                  hireArr:[],
                  jobsArr:[],
                  id:numberOfElementsLastRow,
                  companyName:'',
                  abbreviation:'',
                  logo:'',
                  educationLevel:'',
                  hire:'',
                  link:'',
                  jobs:'',
                  about:'',
                  about:'',
                  createdAt:'',
                  updatedAt:'',
                  __v:'',
                  empty:true });
    numberOfElementsLastRow++;
  }  
  return data;
};

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
      this.props.navigation.push('detailedJob', {   // Navigate away to detailed job route
        job: this.state.jobClicked
      });
  }

  //The function being used by flatList to display the cards
  renderItem = ({ item }) => {
    return (
      
      <JobPoster job={item} onOpen={this.openJob} />
    )
  }


  render(){
    
    const {status,pending} = this.props;
    const data = this.props.navigation.getParam('jobs');
    var msg = 'unfortunately we have no jobs to show for this category but you can help us by telling us which jobs do😁😁😁'

    if(data.length === 0){
      <View style={{backgroundColor:'white',padding:20, borderRadius:20,marginHorizontal:10}}>
        <Text style={{fontSize:19}}>{msg}</Text>
      </View>
    }
    
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
        <View style={[styles.ScreenBackground,styles.container]}>
          <FlatList
            data = {formatData(data,numColumns)}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
            numColumns={numColumns}/>
          <JobPopUp jobClicked={this.state.jobClicked} isOpen={this.state.popupIsOpen}
            onClose={this.closeJob} onBook={this.seeDetailedJob}/>
        </View> 
       
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    //data:  state.data.jobs,      //array of jobs
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
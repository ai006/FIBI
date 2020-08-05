import React from 'react';
import { View, Text, Image } from 'react-native';


import store from '../redux/store';
import { fetchJobsData, fetchJobType } from '../api/api';
import { fetchForumData} from '../api/forumApi';
import {fetchNewsData} from '../api/newsAPI'

/*
  Component for the splash screen (logo shown on startup)
  makes a call to the api function to get the data from the server

  should build another page for no internet connection
*/
class SplashScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fetchFail: false,
      error:''
      
    }
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    try{
      await store.dispatch(fetchJobsData());
      await store.dispatch(fetchJobType());
      await store.dispatch(fetchForumData());
      await store.dispatch(fetchNewsData());
    }catch (e) {
        this.setState({
          fetchFail:true,
          error:e
        })
    }
    


    //switch to new screen (mainOptionsScreen) after the store has been
    //updated with data
    if(store.getState() !== null){

      this.props.navigation.navigate('App');
    }
    
  }

  render() {
    if(this.state.fetchFail === true){
      return(
        <View style={{backgroundColor:'#fcfcfc',padding:20, borderRadius:20,marginHorizontal:10}}>
          <Text style={{fontSize:19}}>something went wrong please restart 
            the app or make sure you have an internet connection </Text>
        </View>
      )
    }
    return (
      <View style={styles.viewStyles}>
           <View>
        <Image
          style={{width: 200, height: 200}}
          source={require('../images/logo_small.jpg')}
        />
        </View>
        <Text style={[styles.placeCenter,styles.textStyles]}>
            F I B I
        </Text>
        <Text style={[styles.placeCenter,styles.subTextStyle]}>
            For Internationals By Internationals
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textStyles: {
    color: 'green',
    fontSize: 40,
    fontWeight: 'bold'
  },
  subTextStyle: {
      color: 'green',
      fontSize: 20,
      fontWeight: '400',
  },
  placeCenter:{
    justifyContent: 'center', 
    alignItems: 'center',
  },
}

export default SplashScreen;

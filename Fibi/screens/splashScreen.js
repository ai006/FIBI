import React from 'react';
import { View, Text, Image } from 'react-native';


import store from '../redux/store';
import { fetchJobsData, fetchJobType } from '../api/api';

/*
  Component for the splash screen (logo shown on startup)
  makes a call to the api function to get the data from the server


  should build another page for no internet connection


*/
class SplashScreen extends React.Component {

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    await store.dispatch(fetchJobsData());
    await store.dispatch(fetchJobType());


    //switch to new screen (jobsDataScree) after the store has been
    //updated with data
    if(store.getState() !== null){

      this.props.navigation.navigate('App');
    }
    else{
      //add another screen for empty store
    }
  }

  render() {
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

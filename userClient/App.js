import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import { fetchJobsData } from './api';
import JobsData from './containers/jobsData';

export default class App extends React.Component {

  componentDidMount(){
    store.dispatch(fetchJobsData());
 //  setInterval(this.printReduxStorage,10000)
  }
 
  printReduxStorage = () => {
    console.log(store.getState())
  }

  render() {
    return (
         <View style={styles.container}>
        
             <Text style={styles.textColor}>WeSponsor</Text>
              <Provider store={store}>
                <JobsData />
              </Provider>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  textColor:{
    color: 'green'
  },
});

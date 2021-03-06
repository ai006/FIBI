import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import store from './redux/store';
import InitialNavigator from './screens/initialNavigation';


/*This is the main function of our app
everything starts here*/ 
export default class App extends React.Component {

  // componentDidMount(){
  //   //store.dispatch(fetchJobsData());
  //   //setInterval(this.printReduxStorage,10000)
  // }
 
  //function used to print all the data in the redux
  printReduxStorage = () => {
   // console.log(store.getState())
  }

  render() {
    /*start the redux process*/
    return (
      <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} 
                  backgroundColor = "#f5f5f5" translucent = {true} />
         <Provider store={store}>
          <InitialNavigator/>
        </Provider>  
      </View>
                
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  textColor:{
    color: 'green'
  },
});

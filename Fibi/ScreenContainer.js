// import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

  import React, { Component } from 'react';
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { Icon } from 'native-base';
  import { Platform } from "react-native";

  import JobsDataScreen from './containers/jobsData';
  import TwitterScreen from './TwitterScreen';
  import UniversityScreen from './screens/universityScreen';
  import Confirmation from './confirmation';
  import ViewSearchResults from './containers/ViewSearchResult';
  import UserAddJob from './UserAddJob';

const JobsStack = createStackNavigator(    
    {
        JobsData  : JobsDataScreen, 
        Confirm   : Confirmation,
        ViewResult: ViewSearchResults,
        AddJob    : UserAddJob,
        
    },
    {
        initialRouteName: "JobsData",
    }
);

JobsStack.navigationOptions = {
     tabBarIcon: ({ focused, tintColor }) => (
      // <Ionicons
      //   name={Platform.OS === "ios" ? "ios-albums-outline" : "md-filing"}
      //   size={25}
      //   color={tintColor}
      // />
      <Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, color: tintColor }}/>
    )
  };

const MainTabs = createBottomTabNavigator(
    {
      Jobs: JobsStack,
      Advice: TwitterScreen,
      University: UniversityScreen,
    },
    {
      tabBarOptions: { //color of active tab
        //activeTintColor: "#a41034"
        activeTintColor: 'green'
      }
    }
);


export default createAppContainer(MainTabs);

//export default Container; 
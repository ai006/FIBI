import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator
  } from "react-navigation";
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
      <Ionicons
        name={Platform.OS === "ios" ? "ios-archive-outline" : "md-filing"}
        size={25}
        color={tintColor}
      />
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


const Container = createAppContainer(MainTabs);

export default Container; 
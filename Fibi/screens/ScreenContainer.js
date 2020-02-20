import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from 'native-base';
import { Platform } from "react-native";

import JobsDataScreen from './jobsDataScreen';
import AdviceScreen from './adviceScreen';
import UniversityScreen from './universityScreen';
import DetailedJobScreen from './detailedJobScreen';
import ViewSearchResults from '../containers/ViewSearchResult';
import UserAddJob from './userAddJobScreen';


//screens on the embedded in the JobsDataScreen
const JobsStack = createStackNavigator(    
    {
        JobsData  : JobsDataScreen, 
        detailedJob   : DetailedJobScreen,
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
      Advice: AdviceScreen,
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
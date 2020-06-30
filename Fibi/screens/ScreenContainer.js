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
import JobOptionScreen from './jobOptionsScreen';

import detailedForumScreen from './forum/detailedForumScreen';
import newQuestionScreen from './forum/newQuestionScreen';
import newAnswerScreen from './forum/newAnswerScreen';
import ForumOptionsScreen from './forum/ForumOptionsScreen';
import ForumScreen from './forum/forumScreen';


//screens on the embedded in the JobsDataScreen
const JobsStack = createStackNavigator(    
    {
        Options   : JobOptionScreen,
        JobsData  : JobsDataScreen, 
        detailedJob   : DetailedJobScreen,
        //ViewResult: ViewSearchResults,
        AddJob    : UserAddJob,
    },
    {
        initialRouteName: "Options",
    }
);

JobsStack.navigationOptions = {
     tabBarIcon: ({ focused, tintColor }) => (
      <Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, color: tintColor }}/>
    )
  };

//screens on the embedded in the Forum Screen
const ForumStack = createStackNavigator(    
  {
      options   : ForumOptionsScreen,
      Forum   : ForumScreen,
      detailedForum : detailedForumScreen,
      newQuestion : newQuestionScreen,
      newAnswer : newAnswerScreen,
  },
  {
      initialRouteName: "options",
  },
);

ForumStack.navigationOptions = {
   tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
         name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
         size={25}  color={tintColor}
    />),
};

const MainTabs = createBottomTabNavigator(
    {
      Jobs: JobsStack,
      Forum: ForumStack,
      University: UniversityScreen,
    },
    {
      tabBarOptions: { //color of active tab
        activeTintColor: 'green',
      }
    }
);


export default createAppContainer(MainTabs);
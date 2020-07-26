import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from 'native-base';
import { Platform } from "react-native";

//jobs
import JobsDataScreen from './jobsDataScreen';
//import AdviceScreen from './adviceScreen';
import UniversityScreen from './universityScreen';
import DetailedJobScreen from './detailedJobScreen';
//import ViewSearchResults from '../containers/ViewSearchResult';
import UserAddJob from './userAddJobScreen';
import JobOptionScreen from './jobOptionsScreen';
import MainOptionsScreen from './mainOptionsScreen';

//forum
import detailedForumScreen from './forum/detailedForumScreen';
import newQuestionScreen from './forum/newQuestionScreen';
import newAnswerScreen from './forum/newAnswerScreen';
import ForumOptionsScreen from './forum/ForumOptionsScreen';
import ForumScreen from './forum/forumScreen';

//news
import NewsOptionsScreen from './news/newsOptionsScreen';

//screens on the embedded in the JobsDataScreen
const MainStack = createStackNavigator(    
  {
      Main   : MainOptionsScreen,         //main view
      JobsData  : JobsDataScreen,         //view with all the jobs and logos
      detailedJob   : DetailedJobScreen,  //detailed job view
      AddJob    : UserAddJob,             //screen for adding job
      Forum   : ForumScreen,              //view with all forum questions selected for that category
      detailedForum : detailedForumScreen, //detailed question with all the comments
      newQuestion : newQuestionScreen,    //screen for asking a new question
      newAnswer : newAnswerScreen,        //screen for asking all the queries
      
  },
  {
      initialRouteName: "Main",
  }
);

MainStack.navigationOptions = {
   tabBarIcon: ({ focused, tintColor }) => (
    <Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, color: tintColor }}/>
  )
};

const NewsStack = createStackNavigator(
  {
      options : NewsOptionsScreen,
  },
  {
    initialRouteName:"options"
  }
);

NewsStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
   <Ionicons
        name={Platform.OS === "ios" ? "ios-paper" : "md-paper"}
        size={25}  color={tintColor}
   />),
};

const MainTabs = createBottomTabNavigator(
    {
      main : MainStack,
      News: NewsStack,
    },
    {
      tabBarOptions: { //color of active tab
        activeTintColor: 'green',
      }
    }
);


export default createAppContainer(MainTabs);
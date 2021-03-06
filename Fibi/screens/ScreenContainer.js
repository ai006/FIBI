import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from 'native-base';
import { Platform } from "react-native";

//jobs
import JobsDataScreen from './jobsDataScreen';
import FeedbackScreen from './help/feedbackScreen';
import DetailedJobScreen from './detailedJobScreen';
import UserAddJob from './userAddJobScreen';
import MainOptionsScreen from './mainOptionsScreen';

//forum
import detailedForumScreen from './forum/detailedForumScreen';
import newQuestionScreen from './forum/newQuestionScreen';
import newAnswerScreen from './forum/newAnswerScreen';
import ForumScreen from './forum/forumScreen';

//news
import NewsOptionsScreen from './news/newsOptionsScreen';


//help
import InputScreen from './help/inputScreen';

//all the screens for jobs and forums
const MainStack = createStackNavigator(    
  {
      Main   : MainOptionsScreen,           //main view
      JobsData  : JobsDataScreen,           //view with all the jobs and logos
      detailedJob   : DetailedJobScreen,    //detailed job view
      AddJob    : UserAddJob,               //screen for adding job
      Forum   : ForumScreen,                //view with all forum questions selected for that category
      detailedForum : detailedForumScreen,  //detailed question with all the comments
      newQuestion : newQuestionScreen,      //screen for asking a new question
      newAnswer : newAnswerScreen,          //screen for asking all the queries
      
  },
  {
      initialRouteName: "Main",
  }
);

//the bottom icon main screen 
MainStack.navigationOptions = {
   tabBarIcon: ({ focused, tintColor }) => (
    <Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, color: tintColor }}/>
  )
};

//all the screens for news
const NewsStack = createStackNavigator(
  {
      options : NewsOptionsScreen,
  },
  {
    initialRouteName:"options"
  }
);

//the bottom icon for news
NewsStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
   <Ionicons
        name={Platform.OS === "ios" ? "ios-paper" : "md-paper"} size={25}  color={tintColor}
   />),
};


//all the screens for feedback
const FeedbackStack = createStackNavigator(
  {
      options : FeedbackScreen,
      input : InputScreen
  },
  {
    initialRouteName:"options"
  }
);

//the bottom icon for help
FeedbackStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
   <Ionicons
        name={Platform.OS === "ios" ? "ios-construct" : "md-construct"}
        size={25}  color={tintColor}
   />),
};

//bottomTab to join all the stacks from main, news, and feedback stack
const MainTabs = createBottomTabNavigator(
    {
      main : MainStack,
      News: NewsStack,
      help: FeedbackStack
    },
    {
      tabBarOptions: { //color of active tab
        activeTintColor: 'green',
      }
    }
);


export default createAppContainer(MainTabs);
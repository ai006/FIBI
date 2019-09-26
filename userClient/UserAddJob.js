import React, { Component} from 'react';
import {StyleSheet, KeyboardAvoidingView,SafeAreaView, Text, TouchableOpacity, ScrollView, View, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { Platform } from "react-native";
import { Header } from 'react-navigation';

import { defaultStyles } from './styles';

const {height, width} = Dimensions.get('window')

export default class UserAddJob extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Add Job',
      headerTitleStyle: {
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        color: 'green',
        fontSize: 25,
    },
    };
  };

  constructor(props){
      super(props);
      this.state = {
            AddedJob: {
                    CompanyName:'',
                    Job:'',
                    city:'',
                    country: '',
                    link: '',
                    about: '',
            },
            nameFocused: false,
            jobFocused: false,
            cityFocused: false,
            countryFocused: false,
            linkFocused: false,
            aboutFocused: false,
      };
  }

  //used to switch the visibility of the place holder on and off
  onNameFocus = () => this.setState({nameFocused: true})
  onNameBlur = () => this.setState({nameFocused: false})


  UpdateJob = (value) => {
    const { AddedJob } = { ...this.state };
    const currentState = AddedJob;
    console.log(value);
    // const { name, value } = event.target;
    // currentState[name] = value;
  
    // this.setState({ AddedJob: currentState });
  }
  
//   UpdateJob  = (property, event) => {
//       const AddedJob = {...this.state.AddedJob};
//       AddedJob[property] = event.target.value;
//       this.setState({AddedJob:AddedJob})
//   }

  SendJobToDB = () => {
      console.log(this.state.AddedJob);
  }

  render() {
    const {nameFocused} = this.state;
    return (
        <View style={styles.ScreenBackground}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset = {Header.HEIGHT+50} style = {{ flex: 1 }}>
                <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.FirstContainer}>
                    <Card style={styles.about}>
                        <View style={[styles.card,styles.container]}>
                            <Text style={styles.paragraph}>
                                The only way that this app can be helpful for the user, is if we have 
                                a large enough database of jobs that sponsor. This page was made so that 
                                you the user can contribute to our database which can help someone else. In turn
                                Please add to our database or tell your friends about it. 
                            </Text>
                        </View>
                    </Card>
                </View>
                <View style={styles.FirstContainer}>
                    <Card>
                        <View style={styles.container}>
                            <Fumi
                                label={'Company Name'} iconClass={FontAwesomeIcon} iconName={'building'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                                placeholder={nameFocused? "e.g. walmart": ''} onFocus={this.onNameFocus}
                                onBlur={this.onNameBlur} value={this.state.AddedJob.CompanyName}
                                onChangeText={this.UpdateJob.apply(value)} name= "CompanyName"
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'Job'} iconClass={FontAwesomeIcon} iconName={'suitcase'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'link'} iconClass={FontAwesomeIcon} iconName={'link'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'City'} iconClass={FontAwesomeIcon} iconName={'industry'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'Country'} iconClass={FontAwesomeIcon} iconName={'globe'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'About'} iconClass={FontAwesomeIcon} iconName={'align-left'}
                                multiline={true}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16} 
                                
                            />
                        </View>
                    </Card>
                </View>
                <Card>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.pop()}>
                    <Text style={styles.button}>Done</Text>
                </TouchableOpacity>
                </Card>
                </ScrollView>
                </KeyboardAvoidingView>
            </View>              
    );
  }
}

const styles = StyleSheet.create({
    paragraph: {
      margin: 10,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    card: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    about: {
      height : 150,
    },
    statusBar: {
        paddingTop: Constants.statusBarHeight,
      },
    FirstContainer: {
        justifyContent: 'center',
        padding: 8,
      },
    ScreenBackground: {
        backgroundColor: '#ecf0f1',
        flex: 1,
    },
    container:{
        marginTop: 5,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 100,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
      },
      button: {
        ...defaultStyles.text,
        color: '#FFFFFF',
        fontSize: 18,
      },
  });
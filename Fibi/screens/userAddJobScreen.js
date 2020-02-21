import React, { Component} from 'react';
import {StyleSheet, KeyboardAvoidingView,SafeAreaView, Text, TouchableOpacity, ScrollView, View, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { Platform,Alert } from "react-native";
import { Header, useHeaderHeight } from 'react-navigation-stack';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import { defaultStyles } from '../styles';
import { sendAddedJob } from '../api/api';

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
                    job:'',
                    city:'',
                    country: '',
                    link: '',
                    about: '',
                    educationLevel:'',
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

  onJobFocus = () => this.setState({jobFocused:true})
  onJobBlur = () => this.setState({jobFocused: false})

  onCityFocus = () => this.setState({cityFocused: true})
  onCityBlur = () => this.setState({cityFocused: false})

  onCountryFocus = () => this.setState({countryFocused:true})
  onCountryBlur = () => this.setState({countryFocused: false})

  onLinkFocus = () => this.setState({linkFocused: true})
  onLinkBlur = () => this.setState({linkFocused: false})

  onAboutFocus = () => this.setState({aboutFocused:true})
  onAboutBlur = () => this.setState({aboutFocused: false})

//   componentDidMount(){
//     //setInterval(this.printState,10000)
//   }

  printState = () => {
    console.log(this.state.AddedJob);
  }

  //used to send 
  SendJobToDB = async () => {
    //this.printState();

     //checks if user has added type of job and name of job
    if( this.state.AddedJob.job !== '' && this.state.AddedJob.CompanyName !== '' && this.state.AddedJob.educationLevel !== ''){                       
      
        status = await sendAddedJob(this.state.AddedJob)       //wait for the repsonse from server (function sendAddedJob in file api)
        if(status){                                            //if server received job go back to the main view
            this.props.navigation.pop()
        }
    }
    else{
        Alert.alert(                                          //alert user of missing companyname and job title   
            'status: incomplete',   
            'Please add the company name, type of job, and education level :)',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }
  }

  render() {
    const {nameFocused, jobFocused, linkFocused, aboutFocused, countryFocused, cityFocused} = this.state;
    let data = [{ value: "Bachelor's degree",}, { value: "Master's degree",}, {value: "Doctoral degree", }];

    return (
        <View style={styles.ScreenBackground}>
            <KeyboardAwareScrollView
               extraScrollHeight={70} enableOnAndroid={Platform.OS === "ios" ? false:true} 
               nableAutoAutomaticScroll={(Platform.OS === 'ios')}
               keyboardShouldPersistTaps='handled'>
               <ScrollView >  
                <View style={styles.FirstContainer}>
                    <Card style={[styles.about,styles.shadow]}>
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
                    <Card style={styles.shadow}>
                        <View style={styles.container}>
                            <Fumi
                                label={'Company Name'} iconClass={FontAwesomeIcon} iconName={'building'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                                placeholder={nameFocused? "e.g. walmart": ''} onFocus={this.onNameFocus}
                                onBlur={this.onNameBlur} 
                                onChangeText={(text) => this.setState(
                                    {...this.state,AddedJob : {...this.state.AddedJob, CompanyName : text}})}
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'Job'} iconClass={FontAwesomeIcon} iconName={'suitcase'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                                placeholder={jobFocused? "e.g. Marketing": ''} onFocus={this.onJobFocus}
                                onBlur={this.onJobBlur} 
                                onChangeText={(text) => this.setState(
                                    {...this.state,AddedJob : {...this.state.AddedJob,job : text}})}
                            />
                        </View>
                       
                        <View style={styles.container}>
                            <Fumi
                                label={'link'} iconClass={FontAwesomeIcon} iconName={'link'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                                placeholder={linkFocused? "e.g. www.amazon.com": ''} onFocus={this.onLinkFocus}
                                onBlur={this.onLinkBlur} 
                                onChangeText={(text) => this.setState(
                                    {...this.state,AddedJob : {...this.state.AddedJob, link : text}})}
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'City'} iconClass={FontAwesomeIcon} iconName={'industry'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                                placeholder={cityFocused? "e.g. London": ''} onFocus={this.onCityFocus}
                                onBlur={this.onCityBlur} 
                                onChangeText={(text) => this.setState(
                                    {...this.state,AddedJob : {...this.state.AddedJob, city : text}})}
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'Country'} iconClass={FontAwesomeIcon} iconName={'globe'}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                                placeholder={countryFocused? "e.g. USA": ''} onFocus={this.onCountryFocus}
                                onBlur={this.onCountryBlur} 
                                onChangeText={(text) => this.setState(
                                    {...this.state,AddedJob : {...this.state.AddedJob, country : text}})}
                            />
                        </View>
                        <View style={styles.container}>
                            <Fumi
                                label={'About'} iconClass={FontAwesomeIcon} iconName={'align-left'}
                                multiline={true}
                                iconColor={'green'} iconSize={20} iconWidth={40} inputPadding={16}
                                placeholder={aboutFocused? "e.g. They fix bridges and roads": ''} onFocus={this.onAboutFocus}
                                onBlur={this.onAboutBlur} 
                                onChangeText={(text) => this.setState(
                                    {...this.state,AddedJob : {...this.state.AddedJob, about : text}})} 
                                
                            />
                        </View>
                        <View>
                            <Dropdown
                                label='Education level'
                                selectedItemColor = 'green'
                                textColor = 'green'
                                labelFontSize = {12}
                                containerStyle={{ marginTop: 5, marginLeft: 10, marginRight:10}}
                                fontSize= {20}
                                data={data}
                                onChangeText={(value) => this.setState(
                                    {...this.state,AddedJob : {...this.state.AddedJob, educationLevel : value}}
                                    )}
                            />
                        </View>
                    </Card>
                </View>
                <Card style={styles.shadow}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.SendJobToDB}>
                        <Text style={styles.button}>Done</Text>
                    </TouchableOpacity>
                </Card>
                </ScrollView>     
                </KeyboardAwareScrollView>
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
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
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
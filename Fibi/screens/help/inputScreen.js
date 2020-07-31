import React from 'react';
import {TextInput, Dimensions, StyleSheet, Text, View,ScrollView,TouchableOpacity,
  Alert } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";

import {mailSender} from '../../api/mailSender';

const { width, height } = Dimensions.get('window');

export default class InputScreen extends React.Component {

static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () =>            
      <TouchableOpacity onPress={() => navigation.getParam('handleClick')()}>
        <View style={{flexDirection:'row'}}>
          <Ionicons
              name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}
              size={30}
              color={'green'}
              style={{marginRight:5}}
            />
          <Text style={{fontSize:23, marginRight:8, color:'green'}}>Send</Text>
            
        </View>
       </TouchableOpacity> ,
        headerRightStyle: {
          flex:1,
          color: 'green',
          fontSize: 25,
        },
        headerTitle: navigation.getParam('title'),
        headerTitleStyle: {
            color: 'green',
            fontSize: 25,
        },
    };
};

constructor(props){
  super(props);
  this.state = {
        answer:'', //the response to the question
  }
}

componentDidMount() {
  // set handler method with setParams
  this.props.navigation.setParams({ 
    handleClick: this.handleClick
  });
}

//function used to get all the user input to send to our database
handleClick = async () => {
  console.log('in handle click')
  if(this.state.answer.length === 0){
    Alert.alert(                                          //alert user if missing response
      'status: incomplete',   
      'Please add text before sending it :)',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    return;
  }
  //console.log(this.state.answer)
  var data  = {
    title : this.props.navigation.getParam('title'),
    body : this.state.answer
  }
  var mailStatus = await mailSender(data,'help');      //send the a notification a question been added
  if( mailStatus === true){
    this.props.navigation.pop()  //go back to the previous screen
  }
 
}

render() {  
  
    return (
          <View style={styles.container}>
              <View style={styles.wrapper}>
                    <View style={styles.input}>
                        <TextInput 
                            multiline
                            scrollEnabled
                            placeholder= {`${this.props.navigation.getParam('placeHolder')}`}
                            style={{fontSize:20,marginVertical:10}}
                            autoFocus
                            onChangeText={(value) => this.setState({answer:value})}
                            value={this.state.answer}
                        />
                    </View>
              </View>
          </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.forum.forum, //array of the questions
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor:'white'
  },
  wrapper: {
      height: height * 0.8,
      width: width * 0.9,
      paddingTop: 5,
  },
  input:{
     height: height * 0.4,
     width: width * 0.9, 
     fontSize: 18,
     backgroundColor:'white',
  },
  btn:{
    position:'absolute',
    width: width*0.3,
    height: height*0.08,
    bottom:15,
    right:15,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green',
    borderRadius:10
  },
});


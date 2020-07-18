import React from 'react';
import {TextInput, Dimensions, StyleSheet, Text, View,ScrollView,TouchableOpacity,
  Alert } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";

import {deleteForumQuestion,insertForumQuestion} from '../../redux/actions/indexForum';
import store from '../../redux/store';
import {sendForumData} from '../../api/sendForumAPI';
import {mailSender} from '../../api/mailSender';

const { width, height } = Dimensions.get('window');

class NewAnswerQuestion extends React.Component {

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
          <Text style={{fontSize:23, marginRight:8, color:'green'}}>Post</Text>
            
        </View>
       </TouchableOpacity> ,
        headerRightStyle: {
          flex:1,
          color: 'green',
          fontSize: 25,
        },
        headerTitle: 'Answer Question',
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

  if(this.state.answer.length === 0){
    Alert.alert(                                          //alert user if missing response
      'status: incomplete',   
      'Please add a response before posting your answer  :)',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    return;
  }

  const id = this.props.navigation.getParam('id');
  const question = this.props.navigation.getParam('question');
  var clone = JSON.parse(JSON.stringify(question));
  const {questions}  = this.props; 
  //let copiedObject = JSON.parse(JSON.stringify(questions))

  /*Check if the question is approved before 
  adding a response to it
  only allow questions that are proved to be 
  updated with a new answer*/ 
  if(question.approved === false){
    Alert.alert(                                          //alert user if missing response
      'status: error',   
      'Please wait until the question is approved before adding a response  :)',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    return;
  }


  let _id = 0;                                               //id of the new question
  for(var i = 0; i < questions[id].comments.length; i++){    //search through all the questions in redux
    if(_id === questions[id].comments[i].id_){                   //and assign the question with a unique ID 
      _id++;
    }
  }
  
  var comment = {
      id_ : _id,
      response: this.state.answer,
      createdAt : new Date(),       //get the date and time the question was answered
      approved : false,             //all new answers will need to be approved        
      show: true,
  }

  var commentAPI = {
      id_ : _id,
      response: this.state.answer,
      createdAt : new Date(),       //get the date and time the question was answered
      approved : false,             //all new answers will need to be approved        
      show: false,
  }
  
  question.comments.push(comment);
  store.dispatch(deleteForumQuestion(id));
  store.dispatch(insertForumQuestion(id,question));

  
  clone.comments.push(commentAPI);
  const route = this.props.navigation.getParam('route');    //get the route of which screen called this page
  var status = await sendForumData(clone,'answer');      //send the question to the DB
  var mailStatus = await mailSender(clone,'forum');      //send the a notification a question been added
  if(route === 'first_route' && status === true && mailStatus === true){
    this.props.navigation.pop()  //go back to the previous screen
  }
  else if(route === 'second_route' && status === true && mailStatus === true){
    this.props.navigation.pop(2)  //go back to the previous two screens
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
                            placeholder='Write your response here'
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

export default connect(mapStateToProps,null)(NewAnswerQuestion);
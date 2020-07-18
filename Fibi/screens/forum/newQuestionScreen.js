import React from 'react';
import {TextInput, Dimensions, StyleSheet,Platform,
        Text, View,ScrollView,TouchableOpacity,Alert } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";

import {addForumQuestion} from '../../redux/actions/indexForum';
import {sendForumData} from '../../api/sendForumAPI';
import store from '../../redux/store';
import {mailSender} from '../../api/mailSender';

const { width, height } = Dimensions.get('window');

class NewQuestionScreen extends React.Component {

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
       </TouchableOpacity> 
     ,
     headerTitleStyle: {
         color: 'green',
         fontSize: 25,
     },
     headerRightStyle: {
      flex:1,
      color: 'green',
      fontSize: 25,
    },
    headerTitle: 'Ask Question',
    };
};

constructor(props){
  super(props);
  this.state = {
        title: '',  //title for the question
        inquiry:'', //the full question
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
  //check to see if the user has entered data before sending it to the api
  if(this.state.title.length === 0 || this.state.inquiry.length === 0){
    Alert.alert(                                          //alert user if missing title or body
      'status: incomplete',   
      'Please add  the title or the body of your question  :)',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    return;
  }

  const {questions}  = this.props; 
  let id_ = 0;                                   //id of the new question
  for(var i = 0; i < questions.length; i++){    //search through all the questions in redux
    if(id_ === questions[i].id){                 //and assign the question with a unique ID 
      id_++;
    }
  }

  var question = {
      id    : id_,
      title : this.state.title,                             //title of the question
      inquiry : this.state.inquiry,                         //the fill question
      comments : [],                                        //comments left blank
      createdAt : new Date(),                               //get the date and time the question was asked
      approved : false,                                      //all new questions will need to be approved        
      show  : true,                                         //show the new question
      category : this.props.navigation.getParam('category') //get the category of the question
  }
  
  //I make two objects because I have to alter the show variable in the obj
  //before sending it to the API I found that the object is by reference 
  //anything I change is also show on both....idk just ask me
  var APIquestion = {
      id    : id_,
      title : this.state.title,                             //title of the question
      inquiry : this.state.inquiry,                         //the fill question
      comments : [],                                        //comments left blank
      createdAt : new Date(),                               //get the date and time the question was asked
      approved : false,                                      //all new questions will need to be approved        
      show  : false,                                         //show the new question
      category : this.props.navigation.getParam('category') //get the category of the question
  }
  store.dispatch(addForumQuestion(question));
  
  //question.show = false;                                    //change show to false so other users won't see it

  var status = await sendForumData(APIquestion,'question');   //send the question to the DB
  var mailStatus = await mailSender(APIquestion,'forum');    //send a notification that something was added to the DB     
  if(status && mailStatus){
    this.props.navigation.pop()  //go back one screens
  }
}

render() {  
    return (
          <View style={styles.container}>
              <View style={styles.wrapper}>
                    <View style={styles.input}>
                      <Text style={{fontWeight:'bold', fontSize:23, color:'black'}}>Title</Text>
                      <View style={{flexDirection:'row'}}>
                        <TextInput 
                            multiline
                            placeholder='e.g. Help with resume'
                            style={{fontSize:20,marginVertical:10,flex:1}}
                            maxLength={35}
                            autoFocus
                            onChangeText={(value) =>this.setState({title:value})}
                            value={this.state.title}
                        />
                        {
                          this.state.title.length === 0 ?
                            null 
                            :
                            <Text style={{alignSelf:'center',fontSize:17, marginLeft:30, color:'green'}}>
                              {35 - this.state.title.length}
                            </Text> 
                        }
                        
                      </View>
                        <Text style={{fontWeight:'bold', fontSize:23, color:'black'}}>Body</Text>
                        <TextInput 
                            multiline
                            scrollEnabled
                            placeholder='Post full question here'
                            style={{fontSize:20,marginVertical:10}}
                            onChangeText={(value) =>this.setState({inquiry:value})}
                            value={this.state.inquiry}
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
    backgroundColor:'blue',
    width: width*0.3,
    height: height*0.08,
    top: Platform.OS === "ios" ? height*0.43 : height*0.36,
    right:15,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green',
    borderRadius:10
  },
});

export default connect(mapStateToProps,null)(NewQuestionScreen);
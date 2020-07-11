import React from 'react';
import {TextInput, Dimensions, StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import {addForumQuestion} from '../../redux/actions/indexForum';
import {sendForumData} from '../../api/sendForumAPI';
import store from '../../redux/store';
import {mailSender} from '../../api/mailSender';

const { width, height } = Dimensions.get('window');

class NewQuestionScreen extends React.Component {

static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Ask Question',
        headerTitleStyle: {
            color: 'green',
            fontSize: 25,
        },
    };
};

constructor(props){
  super(props);
  this.state = {
        title: '',  //title for the question
        inquiry:'', //the full question
  }
}

//function used to get all the user input to send to our database
handleClick = async () => {

  const {questions}  = this.props; 
  let id_ = 0;                                   //id of the new question
  for(var i = 0; i < questions.length; i++){    //search through all the questions in redux
    if(id_ === questions[i].id){                 //and assign the question with a unique ID 
      id_++;
    }
  }

  const question = {
      id    : id_,
      title : this.state.title,                             //title of the question
      inquiry : this.state.inquiry,                         //the fill question
      comments : [],                                        //comments left blank
      createdAt : new Date(),                               //get the date and time the question was asked
      approved : false,                                      //all new questions will need to be approved        
      show  : true,                                         //show the new question
      category : this.props.navigation.getParam('category') //get the category of the question
  }
  store.dispatch(addForumQuestion(question));
  
  question.show = false;                                    //change show to false so other users won't see it

  var status = await sendForumData(question,'question');   //send the question to the DB
  var mailStatus = await mailSender(question,'forum');    //send a notification that something was added to the DB     
  if(status && mailStatus){
    this.props.navigation.pop(2)  //go back two screens
  }
}

render() {  
    return (
          <View style={styles.container}>
              <View style={styles.wrapper}>
                    <View style={styles.input}>
                        <Text style={{fontWeight:'bold', fontSize:23, color:'black'}}>Title</Text>
                        <TextInput 
                            multiline
                            placeholder='e.g. Help with resume'
                            style={{fontSize:20,marginVertical:10}}
                            maxLength={35}
                            autoFocus
                            onChangeText={(value) =>this.setState({title:value})}
                            value={this.state.title}
                        />
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
            <TouchableOpacity style={styles.btn} onPress={this.handleClick}>
                <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Post</Text>
                {/* <Icon name='create' type='material' color='white' size={10}/> */}
            </TouchableOpacity>
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

export default connect(mapStateToProps,null)(NewQuestionScreen);
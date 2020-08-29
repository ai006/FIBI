import React from 'react';
import {Dimensions, StyleSheet, Text, View,ScrollView,
         TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');

export default class ForumCard extends React.Component {

  /*function is used to pass data from child to parent class
    the function passes the ID of the selected card which is 
    used to identify the element in the array to update*/
  handleClick = () => {
    this.props.openAnswer(this.props.id, this.props.question); //send the id of the clicked question
  }

  render() {

    const {question} = this.props   //get the object being passed from the APP.js file
    const {openAnswer} = this.props
    const datePosted = formatDistance(Date.parse(question.createdAt),new Date())    //get the date or time question was asked
    
    if(question.show === false){
      return(
        null
      )
    }

    /*line 33 to 40 is used to find the number of comments 
    that have been approved
    when you start the app all the questions in the DB are retrieved
    some of the questions have been approved and some have not
    it could be done better*/
    var visibleAnswers, dontShow = 0;
    for( var i = 0; i < question.comments.length; i++ ){
      if(question.comments[i].show === false){
        dontShow++;
      }
    }
    visibleAnswers = question.comments.length - dontShow;
   // var temp = question.inquiry.replaceAll('<br/>','\n');

    return (
          <View style={{height: height * 0.215,
                        width: width,
                        backgroundColor: question.approved ? 'white': '#f0f0f0',
                        borderBottomWidth :1, borderBottomColor: '#f0f0f0',marginTop:1
                      }}>
              {
                question.approved ? null   :            
                  <View style={styles.pending}>
                    <Text style={{ fontSize: wp('5%'), fontWeight:'bold', color:'red'}}> pending approval</Text>
                  </View> 
              }
              <View style={styles.title}>
                <Text style={{ fontSize: wp('5%'), fontWeight:'bold', color:'black'}}> {question.title}</Text>
              </View>
              <View style={styles.text}> 
                  <Text style={{flex:1,flexShrink:1, marginLeft:10, fontSize: wp('5%'),color:'#707070'}} numberOfLines={6}>
                      {question.inquiry}
                  </Text>
              </View>
              <View style={styles.feedback}>
                <View style={styles.write}>
                        <Icon name='comment' type='evilicon' color='#00AF33' size={wp('5%')}/>
                        <Text style={{ fontSize: wp('5%'), alignSelf:'center',color:'#00AF33'}}> {visibleAnswers} </Text>
                        <Text style={{fontWeight:'bold',color:'gray'}}>answers</Text>
                </View>
                <View style={styles.write}>
                    <TouchableOpacity style={styles.write} onPress={this.handleClick}>
                        <Icon name='create' type='material' color='#00AF33' size={wp('5%')}/>
                        <Text style={{fontWeight:'bold',color:'gray'}}>respond</Text>
                    </TouchableOpacity>
                </View>
                     <Text style={{fontWeight:'bold',color:'gray',marginRight:10, fontSize: wp('4%')}}> {datePosted} ago</Text>
              </View>
          </View>
        
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: height * 0.215,
    width: width,
    backgroundColor: 'white',
  },
  title: {
    flex:1,
    marginLeft: 5,
    marginTop:2
    
  },
  pending:{
   // flex:1,
    marginRight: 10,
    alignItems:'flex-end'

  },
  text: {
    flex: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 0,
  },
  feedback: {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
  },
  write: {
    flex:1,
    flexDirection:'row',
    marginLeft: 5,
    alignItems:'center'
  },
  writeTitle: {
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
});
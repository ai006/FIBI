import React from 'react';
import {Dimensions, StyleSheet, Text, View,ScrollView ,TouchableOpacity} from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'

import CommentCard from '../../cards/commentCard'

//import GeneralQuestionScreen from './generalQuestionScreen'

// GeneralQuestionScreen.navigationOptions = {
//     headerShown:false
// }

const { width, height } = Dimensions.get('window');

export default class detailedForumScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Question',
            headerTitleStyle: {
                color: 'green',
                fontSize: 25,
            },
        };
    };

constructor(props){
    super(props);
    //this.
}

//function used in getting the time when a response is made
getTime = (time) => {
    return  formatDistance(Date.parse(time),new Date())
}

handleClick = () => {

    this.props.navigation.push('newAnswer',{
                                                id : this.props.navigation.getParam('id'),
                                                question: this.props.navigation.getParam('query'),
                                                route : 'second_route'
                                            });
}



render() {
    const query = this.props.navigation.getParam('query');  //get the question that was selected plus comments
    const datePosted = formatDistance(Date.parse(query.createdAt),new Date())    //get the date or time question was asked
    

    /*line 33 to 40 is used to find the number of comments 
    that have been approved
    when you start the app all the questions in the DB are retrieved
    some of the questions have been approved and some have not
    it could be done better*/
    var visibleAnswers, dontShow = 0;
    for( var i = 0; i < query.comments.length; i++ ){
      if(query.comments[i].show === false){
        dontShow++;
      }
    }
    visibleAnswers = query.comments.length - dontShow;


    return (
      
        <ScrollView>
            <View style={{marginTop:3,borderBottomWidth :1, borderBottomColor: '#f0f0f0',
                            backgroundColor: query.approved ? 'white': '#f0f0f0'}}>
                <View style={{ flex: 2, paddingBottom: height*0.10}}>
                    {
                        query.approved ? null   :            
                        <View style={styles.pending}>
                            <Text style={{ fontSize: 11, fontWeight:'bold', color:'red'}}> pending approval</Text>
                        </View> 
                    }
                    <View style={styles.title}>
                        <Text style={{ fontSize: 18, fontWeight:'bold', color:'black'}}> {query.title} </Text>
                    </View>
                    <View style={styles.text}> 
                        <Text style={{ flex:1, fontSize: 16,color:'#585858'}}> {query.inquiry} </Text>
                    </View>
                </View>
                <View style={styles.feedback}>
                    <View style={styles.write}>
                            <Icon name='comment' type='evilicon' color='green' size={27}/>
                            <Text style={{ fontSize: 18, alignSelf:'center',color:'green'}}> {visibleAnswers} </Text>
                            <Text style={{fontWeight:'bold',color:'gray'}}>answers</Text>
                    </View>
                    <View style={styles.write}>
                        <TouchableOpacity style={styles.write} onPress={this.handleClick}>
                            <Icon name='create' type='material' color='green' size={20}/>
                            <Text style={{fontWeight:'bold',color:'gray'}}>Respond</Text>
                        </TouchableOpacity>
                    </View>
                        <Text style={{fontWeight:'bold',color:'gray',marginRight:10}}> {datePosted} ago</Text>
                </View>
            </View>
            {query.comments.map((comment,index) =>  
                <View key={index}>
                    <CommentCard comment={comment} />
                </View>
            )}
        </ScrollView> 
        );
    }
}


const styles = StyleSheet.create({
card: {
    backgroundColor:'white', 
    marginTop:3,
},
commentCard: {
    backgroundColor:'white', 
    marginTop:3,
    marginHorizontal: 5,
    paddingBottom: 30,
},
title: {
    flex:1,
},
text: {
    flex: 4,
    marginTop: 5,
    marginHorizontal:5
},
feedback: {
    flex:1,
    flexDirection:'row',
   // backgroundColor:'white',
    alignItems: 'center',
},
write: {
    flex:1,
    flexDirection:'row',
   // backgroundColor:'white',
    marginLeft: 5,
    alignItems:'center'
},
timeStamp: {
    alignSelf: 'flex-end'
},
pending:{
    // flex:1,
     marginRight: 10,
     alignItems:'flex-end'
 
   },
});
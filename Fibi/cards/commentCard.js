import React from 'react';
import {Dimensions, StyleSheet, Text, View,ScrollView,
         TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'


const { width, height } = Dimensions.get('window');

export default class CommentCard extends React.Component {

//function used in getting the time when a response is made
getTime = (time) => {
    return  formatDistance(Date.parse(time),new Date())
}

render() {

    const {comment} = this.props   //get the object being passed from the APP.js file
    
    if(comment.show === false){
      return(
        null
      )
    }

    return (
        <View style={{backgroundColor: comment.approved ? 'white': '#f0f0f0', marginTop:3,}}>
        {
            comment.approved ? null   :            
            <View style={styles.pending}>
                <Text style={{ fontSize: 11, fontWeight:'bold', color:'red'}}> pending approval</Text>
            </View> 
        }
        <View style={{ flex: 2, paddingBottom: height*0.10}}>
            <View style={styles.title}>
                <Text style={{ fontSize: 15, fontWeight:'bold', color:'green'}}> Response </Text>
            </View>
            <View style={styles.text}> 
                <Text style={{ flex:1, fontSize: 18}}> {comment.response} </Text>
            </View>
        </View>
        <View style={styles.timeStamp}>
            <Text style={{marginRight:10, fontWeight:'bold',color:'gray'}}> {this.getTime(comment.createdAt)} ago</Text>
        </View>
    </View> 
    )
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
       // backgroundColor: 'white',
        marginTop: 5,
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
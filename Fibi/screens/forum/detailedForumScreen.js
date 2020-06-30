import React from 'react';
import {Dimensions, StyleSheet, Text, View,ScrollView ,TouchableOpacity} from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'

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



render() {
    const query = this.props.navigation.getParam('query');  //get the question that was selected plus comments
    const datePosted = formatDistance(Date.parse(query.createdAt),new Date())    //get the date or time question was asked
    
    return (
        <ScrollView>
            <View style={styles.card}>
                <View style={{ flex: 2, paddingBottom: height*0.10}}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 15, fontWeight:'bold', color:'green'}}> {query.inquiry} </Text>
                    </View>
                    <View style={styles.text}> 
                        <Text style={{ flex:1, fontSize: 18}}> {query.inquiry} </Text>
                    </View>
                </View>
                <View style={styles.feedback}>
                    <View style={styles.write}>
                            <Icon name='comment' type='evilicon' color='green' size={27}/>
                            <Text style={{ fontSize: 18, alignSelf:'center',color:'green'}}> {query.comments.length} </Text>
                            <Text style={{fontWeight:'bold',color:'gray'}}>answers</Text>
                    </View>
                    <View style={styles.write}>
                        <TouchableOpacity style={styles.write} onPress={() => this.props.navigation.push('newAnswer')}>
                            <Icon name='create' type='material' color='green' size={20}/>
                            <Text style={{fontWeight:'bold',color:'gray'}}>Respond</Text>
                        </TouchableOpacity>
                    </View>
                        <Text style={{fontWeight:'bold',color:'gray',marginRight:10}}> {datePosted} ago</Text>
                </View>
            </View>
            {query.comments.map((comment,index) =>      
                <View key={index} style={styles.card}>
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
    backgroundColor: 'white',
    marginTop: 5,
},
feedback: {
    flex:1,
    flexDirection:'row',
    backgroundColor:'white',
    alignItems: 'center',
},
write: {
    flex:1,
    flexDirection:'row',
    backgroundColor:'white',
    marginLeft: 5,
    alignItems:'center'
},
timeStamp: {
    alignSelf: 'flex-end'
}
});
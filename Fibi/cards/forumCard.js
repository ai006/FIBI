import React from 'react';
import {Dimensions, StyleSheet, Text, View,ScrollView,
         TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'


const { width, height } = Dimensions.get('window');

export default class ForumCard extends React.Component {

  render() {

    const {question} = this.props   //get the object being passed from the APP.js file
    const {openAnswer} = this.props
    const datePosted = formatDistance(Date.parse(question.createdAt),new Date())    //get the date or time question was asked
    //console.log(question)
    return (
          <View style={styles.card}>
              <View style={styles.title}>
                <Text style={{ fontSize: 15, fontWeight:'bold', color:'black'}}> {question.title}</Text>
              </View>
              <View style={styles.text}> 
                  <Text style={{flex:1,flexShrink:1, marginLeft:5, fontSize: 18}} numberOfLines={6}>
                      {question.inquiry}
                  </Text>
              </View>
              <View style={styles.feedback}>
                <View style={styles.write}>
                        <Icon name='comment' type='evilicon' color='#00AF33' size={30}/>
                        <Text style={{ fontSize: 18, alignSelf:'center',color:'gray'}}> {question.comments.length} </Text>
                        <Text style={{fontWeight:'bold',color:'gray'}}>answers</Text>
                </View>
                <View style={styles.write}>
                    <TouchableOpacity style={styles.write} onPress={openAnswer}>
                        <Icon name='create' type='material' color='#00AF33' size={20}/>
                        <Text style={{fontWeight:'bold',color:'gray'}}>respond</Text>
                    </TouchableOpacity>
                </View>
                     <Text style={{fontWeight:'bold',color:'gray',marginRight:10}}> {datePosted} ago</Text>
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
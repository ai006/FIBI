import React, {Component} from 'react'
import {Platform,ImageBackground,Dimensions,ScrollView,StyleSheet, Text,Image, TouchableOpacity,View} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import SpecificCard from '../../cards/specificOptionsCard'
import {Questions} from './models'

const { width, height } = Dimensions.get('window');

class ForumOptionsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          headerLeft:  () =>
          <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image
                  source={require('../../images/logo_small.jpg')}
                  style={{width:40, height:40, flex:1}}
                  resizeMode="contain"
              />
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{
                alignSelf:'center',
                color: 'green',
                fontSize: 20,
                fontFamily:Platform.OS === 'ios'? 'Avenir': 'serif',}}>
                  FIBI
              </Text>
          </View>
        </View>
        ,
          headerRight: () =>            
           <TouchableOpacity onPress={()=> console.log('hello')}>
             <Ionicons
                name={Platform.OS === "ios" ? "ios-person-add" : "md-person-add"}
                size={25}
                color={'green'}
                style={{marginRight:20}}
              />
            </TouchableOpacity> 
          ,
          headerTitle: () => null,
          headerLeftStyle: {
            textAlign: "center",
            justifyContent: 'center',
            alignItems: 'center',
            flex:1,
            color: 'green',
            fontSize: 25,
        },
        };
      };

    
  //function to get the selected type of occupation and search through 
  //the redux for the questions in that category
    openQuestions = (category) => {
      console.log('ere')
      //send all the questions to the Furum Screen and the category selected
      this.props.navigation.push('Forum', { 
                                            //questions:results,  //array containing all the selected category
                                            option : category   //name of the category selected
                                          }
      );
    }

    render() {   
      const {questions,jobTypes,datas}  = this.props; 
      //console.log(datas)
        return (
            <View style={{backgroundColor:'blue', marginBottom: 10}}>
              <ScrollView>
                { 
                    jobTypes.map((jobType,index) =>  
                        <View key={index} style={{marginTop: 15}}>
                            <SpecificCard chatOptions={jobType} openOptions={this.openQuestions}/>
                        </View>
                    )
                }
              </ScrollView>
            </View>
        );
      }
    }
 
const mapStateToProps = state => {
  return {
    datas :state,
    questions: state.forum.forum, //array of the type of jobs
    jobTypes: state.jobType.jobTypes, //array of the type of jobs
    status: state.forum.error,    //string of error message if an error occurs during fetch
    pending: state.forum.pending, //boolean true during fetching of API data and false before and after fetching  
  };
}; 

const styles = StyleSheet.create({
shadow: {
    backgroundColor:'#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
    width: 5,
    height: 5,
    },
    elevation:14,
    shadowRadius: 2,
    shadowOpacity: 0.9,
},
about: {
    height : height* 0.145,
    width : width*0.98, 
},
cardRadius: {
    borderRadius: 10
},
contents: { 
    alignItems:'center', 
    justifyContent: 'center',
    flex:4,
},
questions: { 
    alignItems:'center',
    marginRight:10,
    alignSelf: 'flex-end',
    flexDirection:'row',
    marginBottom:6,
    flex:1,
},
text : {
    fontSize: 25, 
    fontWeight:'bold', 
    color:'white'
},
textBelow : {
    fontSize: 15, 
    fontWeight:'bold', 
    color:'white'
},
circle : {
    height:25,
    width: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems:'center', 
    justifyContent: 'center',
},
number : {
    fontWeight : 'bold',
    fontSize: 13,
    color: 'gray'
}
});


export default connect(mapStateToProps,null)(ForumOptionsScreen);
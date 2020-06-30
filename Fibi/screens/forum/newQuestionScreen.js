import React from 'react';
import {TextInput, Dimensions, StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'
import { Questions } from './models';

const { width, height } = Dimensions.get('window');

export default class NewQuestionScreen extends React.Component {

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
handleClick  = () => {
  
  const question = {
      title : this.state.title,     //title of the question
      inquiry : this.state.inquiry, //the fill question
      commments : [],               //comments left blank
      createdAt : new Date(),       //get the date and time the question was asked
      approved : false,             //all new questions will need to be approved        
      category : this.props.navigation.getParam('category') //get the category of the question
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
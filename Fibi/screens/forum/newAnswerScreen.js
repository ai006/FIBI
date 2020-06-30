import React from 'react';
import {TextInput, Dimensions, StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'


const { width, height } = Dimensions.get('window');

export default class NewAnswerQuestion extends React.Component {

static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Answer Question',
        headerTitleStyle: {
            color: 'green',
            fontSize: 25,
        },
    };
};

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

                        />
                    </View>
              </View>
            <TouchableOpacity style={styles.btn}>
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
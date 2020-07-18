import React from 'react';
import {Dimensions, StyleSheet, Text, View,ScrollView,
         TouchableOpacity, Image,Modal } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'
import { WebView } from 'react-native-webview';
import Ionicons from "react-native-vector-icons/Ionicons";


const { width, height } = Dimensions.get('window');

export default class NewsModal extends React.Component {

  handleClose = () => {
    return this.props.handleClick();
  } 
  
  render() {
    const {show,article} = this.props   
     
     var valid = true;           //boolean to check if the link is valid or not
     var link = 'Something went wrong :( \n\n\Please try again or inform us about it on the next page :)';
     if(article.url === undefined || article.url === null){   
        valid = false;
      }
    

    return (
        <Modal
            animationType="slide"
            transparent
            visible={show}
            onRequestClose={this.handleClose}>
            <View style={{flex:1, alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0, 0.7)'}}>
                <TouchableOpacity 
                  onPress={this.handleClose} 
                  style={{ width:width,justifyContent:'flex-end'}}>
                     <View style={{flexDirection:'row', alignSelf:'flex-end',marginRight:width*0.025}}>
                      <Ionicons
                          name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                          size={Platform.OS === "ios" ? 45 : 30}
                          color={'white'}
                          style={{alignSelf:'center', marginRight: 10}}
                      />
                      <Text style={{color:'white',alignSelf:'center', fontSize:16}}>Close</Text>
                    </View>
                </TouchableOpacity>
                <View style={{height:height*0.88, width: width*0.95}}>
                  {
                    valid === true ? 
                      <WebView source={{uri : article.url}} 
                      startInLoadingState
                      style={{flex:1}}
                      scalesPageToFit
                      />
                      :
                      <View style={{flex: 1,backgroundColor:'white',alignItems:'center',
                                    borderRadius:20,justifyContent:'center'}}>
                        <Text style={{fontSize: 30, marginHorizontal: 5}}>{link}</Text>
                      </View> 
                  }
                    
                </View>
            </View>
        </Modal>
       
    );
  }
}

const styles = StyleSheet.create({

});
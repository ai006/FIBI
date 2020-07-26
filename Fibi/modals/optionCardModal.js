import React from 'react';
import {Dimensions, StyleSheet, Text, View,ScrollView,
         TouchableOpacity, Image,Modal,ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'
import { WebView } from 'react-native-webview';
import Ionicons from "react-native-vector-icons/Ionicons";


const { width, height } = Dimensions.get('window');

var randomImg = [
    require('../images/Cinnamint.jpg'), require('../images/EasyMed.jpg'),    
    require('../images/EndlessRiver.jpg'), require('../images/GreenandBlue.jpg'), 
    require('../images/Limeade.jpg'),     
    require('../images/Mild.jpg'), require('../images/Mojito.jpg'),    
    require('../images/NeonLife.jpg'), require('../images/Ohhappiness.jpg'),
    require('../images/Quepal.jpg'), require('../images/SummerDog.jpg'),
    require('../images/TealLove.jpg')];

export default class OptionCardModal extends React.Component {

  handleClose = () => {
    return this.props.handleClick();
  } 

  openJob = () => {
      return this.props.handleModal(this.props.data.occupation,'job')
  }

  openQuestion = () => {
    return this.props.handleModal(this.props.data.occupation,'question')
  }
  
  render() {
    const  {show,data}  = this.props   
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
                <ImageBackground 
                    source={ randomImg[Math.floor(Math.random()*randomImg.length)]}
                    style={{height:height*0.45, width: width*0.95,borderRadius:20}}
                    imageStyle={{ borderRadius: 20}}
                    >
                      <View style={{flex: 2,alignItems:'center',
                                    justifyContent:'center'}}>
                        <Text style={{fontSize: 30, marginHorizontal: 5}}>{data.emoji}</Text>
                        <Text style={{fontSize: 30, marginHorizontal: 5, color:'white',fontWeight:'bold'}}>{data.occupation}</Text>
                      </View>
                      { data.special    ? 
                        //if the card is special e.g. University, General, SAT & GRE show this
                        <TouchableOpacity 
                            style={{flex:1,backgroundColor:'white',borderRadius:20,margin:10}}
                            onPress={this.openQuestion} 
                                >
                            <View style={{flex:3,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                                <Text style={{fontSize: 20, marginHorizontal: 5, color:'green',fontWeight:'bold'}}>{data.questions}</Text>
                                <Text style={{fontSize: 20, marginHorizontal: 5, color:'green'}}>{data.displayRight}</Text>
                            </View>
                            <View style={{flex:1,alignSelf:'center'}}>
                                <Text>Tap here</Text>
                            </View>
                        </TouchableOpacity>
                      : 
                        //if the card is an actual accupation e.g. Accounting, engineering, etc.. show this
                        <View style={{flex: 1,flexDirection:'row'}}>
                            <TouchableOpacity 
                                style={{flex:1,backgroundColor:'white',borderRadius:20,margin:10}}
                                onPress={this.openQuestion} 
                                    >
                                <View style={{flex:3,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                                    <Text style={{fontSize: 20, marginHorizontal: 5, color:'green',fontWeight:'bold'}}>{data.questions}</Text>
                                    <Text style={{fontSize: 20, marginHorizontal: 5, color:'green'}}>Questions</Text>
                                </View>
                                <View style={{flex:1,alignSelf:'center'}}>
                                    <Text>Tap here</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={{flex:1,backgroundColor:'white',borderRadius:20,margin:10}}
                                onPress={this.openJob}
                                >
                                <View style={{flex:3,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                                    <Text style={{fontSize: 20, marginHorizontal: 5, color:'green',fontWeight:'bold'}}>{data.jobs}</Text>
                                    <Text style={{fontSize: 20, marginHorizontal: 5, color:'green'}}>Jobs</Text>
                                </View>
                                <View style={{flex:1,alignSelf:'center'}}>
                                    <Text>Tap here</Text>
                                </View>
                            </TouchableOpacity>
                        </View> 
                    }
                </ImageBackground>
            </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({

});
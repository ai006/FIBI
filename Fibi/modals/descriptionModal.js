import React, { Component } from 'react';
import { Text, Modal, TouchableOpacity, StyleSheet, AsyncStorage,Dimensions } from 'react-native';
import { ThemeProvider } from 'react-native-paper';
import { View } from 'native-base';

const { width, height } = Dimensions.get('window');

export default class descriptionModal extends Component {
  
  handleCloseNO = () => {
      return this.props.onclick();
  } 
  
  handleCloseYES = () => {
    return this.props.reopen();
  } 
   
   
render() {
    
    const {title, description, clicker} = this.props;
    return (
       <Modal
            animationType="slide"
            visible={clicker}
            transparent={true}
            >
        <View style={{ backgroundColor:'rgba(52, 52, 52, 0.8)',justifyContent:'center',
                        alignItems:'center', flex:1}}>
          <View style={{ backgroundColor:'#FFFFFF', height:height*0.6, width: width * 0.85,
                         borderRadius:20}}>
            <View style={{ flex:2}}>
              <View style={{ flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontWeight: 'bold',fontSize:16}}>{title}</Text>
              </View>
              <View style={{flex:4,marginHorizontal:10}}>
                <Text>{description}</Text>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={{flex:1,alignSelf:'center'}}>Do you want to see this message again?</Text>
              <View style={{ flex: 2, flexDirection: 'row',justifyContent:'center'}}>
                <TouchableOpacity style={styles.buttonContainer} 
                  onPress= {this.handleCloseNO}>
                  <Text style={{color:'green',fontWeight:'bold'}}>NO</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} 
                  onPress={this.handleCloseYES}>
                  <Text style={{color:'green',fontWeight:'bold'}}>YES</Text> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
      
  }
}
const styles = StyleSheet.create({
    buttonContainer: {
        flex:1,
        alignItems:'center'
      },
    });
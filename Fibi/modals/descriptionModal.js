import React, { Component } from 'react';
import { Text, Modal, TouchableOpacity, StyleSheet, AsyncStorage,Dimensions } from 'react-native';
import { ThemeProvider } from 'react-native-paper';
import { View } from 'native-base';

const { width, height } = Dimensions.get('window');

export default class descriptionModal extends Component {
    handleClose = () => {
       return this.props.onclick();
       //console.log("pressed");
      } 
      handleClosereopen = () => {
        return this.props.reopen();
        console.log("pressed");
       } 
   
   
render() {
    
    const {title, description, clicker} = this.props;
    return (
      <View>
      
       <Modal
            animationType="slide"
            //onSwipeComplete={() => this.setModalVisible(false)}
            swipeDirection='left'
            visible={clicker}
            transparent={true}
            //onRequestClose={this.handleClose}
            >
             <View style={{ backgroundColor:'rgba(52, 52, 52, 0.8)', flex:1}}>
             <View style={{ backgroundColor:'#FFFFFF',height:height,width: width * 0.80, margin:40, marginBottom:200, borderRadius:10,flex:1}}>
                <View style={{ margin:40,flex:1}}>
                <View>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
                </View>
                <View style={{ marginTop:40,flex:1}}>
               <Text>{description}</Text>
               </View>
               </View>
          <View style={{ padding: 30, justifyContent:'space-between', marginTop: 180,flex:1}}>
            <Text>Do you want to see this message again?</Text>
               

            <View style={{  flex: 1, flexDirection: "row"}}>
         <TouchableOpacity style={styles.buttonContainer} onPress= 
          {this.handleClose}
           >
        < Text>
               NO
           </Text> 
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonContainer} onPress=
           {this.handleClosereopen}
           >
        < Text>
               YES
           </Text> 
    </TouchableOpacity>
    </View>
    </View>
    </View>
    </View>
      </Modal>
     
      </View>
    );
      
  }
}
const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 20,
        height:height*0.06, 
        width: width*0.2, 
        margin: 15
      // marginBottom: height * 0.08,
      // paddingVertical: height * 0.02,
      // paddingHorizontal: width * 0.1,
    
      },
    });
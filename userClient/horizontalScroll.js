import React, { Component} from 'react';
import {StyleSheet,Text, View} from 'react-native';
import { Card } from 'react-native-paper';

export default class HorizontalScroll extends Component {

  render() {
    return (
            <View> 
              <Card style={[styles.card,styles.shadow]}>
                
              <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                  <Text style={{textAlignVertical: "center",textAlign: "center",color: 'green',
                                 fontWeight: '400',fontSize:15}}>{this.props.name}</Text>
              </View>
              </Card>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    height:50,
    width:130,
    borderRadius:8,
    marginLeft:20, 
    backgroundColor: '#fcfcfc'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
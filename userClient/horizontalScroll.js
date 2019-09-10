import React, { Component} from 'react';
import {StyleSheet,Text, View} from 'react-native';
import { Card } from 'react-native-paper';

export default class HorizontalScroll extends Component {

  render() {
    return (
            <View> 
              <Card style={styles.card}>
                <Text style={{color: 'white',flex:1 }}>
                     {this.props.name}
                </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#41ab4e'
  },
});
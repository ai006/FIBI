import React, { Component} from 'react';
import {Text, View, ScrollView} from 'react-native';

import HorizontalScroll from './horizontalScroll';

export default class ScrollViews extends Component {

  render() {
    return (
            <View style={{marginTop: 10, flex:1}}>
                <Text style={{flex:1,color:'#a5acad', fontWeight: '500',marginLeft:20}}>{this.props.group}</Text>
                <ScrollView 
                    horizontal= {true}
                    showsHorizontalScrollIndicator={false}
                    >
                    {this.props.name.map((hire, index) =>{return(<HorizontalScroll key={index} name={hire}/>)})}
                </ScrollView>
            </View>
            
        
    );
  }
}
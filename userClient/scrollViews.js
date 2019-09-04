import React, { Component} from 'react';
import {Text, View, ScrollView} from 'react-native';

import HorizontalScroll from './horizontalScroll';

export default class ScrollViews extends Component {

  render() {
    return (
            <View style={{marginTop: 10}}>
                <Text style={{flex:1,marginBottom:5,fontWeight: '500',color:'#e0e04f',marginLeft:20}}>{this.props.group}</Text>
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
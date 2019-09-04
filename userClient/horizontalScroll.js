import React, { Component} from 'react';
import {Text, View} from 'react-native';

export default class HorizontalScroll extends Component {

  render() {
    return (
            <View 
                style={{    //to change the way the horizontal scrollview should be done here
                        height:50,
                        width:130, 
                        alignItems: 'center', 
                        marginLeft:20,
                        borderRadius:15,
                        borderWidth: 1,
                        borderColor:'#673AB7',
                        backgroundColor:'white',
                        flex: 1,
                        justifyContent: 'center'
                        }}
                         >
                <Text style={{color: 'purple', }}>
                     {this.props.name}
                </Text>
            </View>
    );
  }
}